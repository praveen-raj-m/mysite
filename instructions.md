Absolutely! Here's a second stored procedure that simply **copies all rows as-is** from `ContractTerm` (along with related contract info) into `ContractTermBreakdown` — with **no merging**, **no filtering**, and **no grouping**.

---

## ✅ Stored Procedure: Copy All Rows Without Any Changes

```sql
CREATE PROCEDURE dbo.PopulateContractTermBreakdown_AllRaw
AS
BEGIN
    BEGIN TRY
        INSERT INTO dbo.ContractTermBreakdown (
            ContractTermID,
            ContractID,
            BusinessUnitID,
            WDCompanyID,
            CategoryID,
            CostCenterID,
            TaxType,
            Fees
        )
        SELECT
            ct.ContractTermID,
            c.ContractID,
            c.BusinessUnitID,
            c.WDCompanyID,
            c.CategoryID,
            c.CostCenterID,
            ct.TaxType,
            ct.Fees
        FROM ContractTerm ct
        INNER JOIN Contract c ON ct.ContractID = c.ContractID;
    END TRY

    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();

        RAISERROR ('Error in PopulateContractTermBreakdown_AllRaw: %s',
                   @ErrorSeverity, @ErrorState, @ErrorMessage);
    END CATCH
END;
```

---

## 🛠 How to Use

You now have **two procedures**:

* `PopulateContractTermBreakdown` → for **merged logic** with fee summing
* `PopulateContractTermBreakdown_AllRaw` → for **1-to-1 copy** without any transformation

Just run either depending on your use case:

```sql
EXEC dbo.PopulateContractTermBreakdown;        -- for merging
EXEC dbo.PopulateContractTermBreakdown_AllRaw; -- for direct copy
```

Let me know if you'd like a flag column (e.g., `IsMerged`) or timestamp tracking (`CreatedAt`, etc.) in the table as well.



Perfect — thanks for the clarification. Here's what I now understand, and then I’ll walk you through the new logic and the updated stored procedure.

---

## ✅ Updated Understanding

### 🧠 Goal:

1. **You don’t want to skip any rows.**
2. You want to **group/merge child contracts with their parent** (if the only differences are in the 4 fields: `BusinessUnitID`, `WDCompanyID`, `CategoryID`, `CostCenterID`).
3. **Fees should be added together** during the merge.
4. All other contract terms (that don’t qualify for merge) should still be included individually.
5. So:

   * If a contract is **mergeable with its parent**, roll up the term to the **parent contract**, summing the `Fees`.
   * If not, just include it **as-is**.

---

## 🛠 Strategy

We’ll:

* Use a `CASE` to determine if a contract should be **treated as its parent**.
* Use a `GROUP BY` to **sum the fees** for contracts that merge with their parent.
* Include both merged and unmerged rows in the final result.

---

## ✅ Final Stored Procedure (New Merge Logic with Summed Fees)

```sql
CREATE PROCEDURE dbo.PopulateContractTermBreakdown
AS
BEGIN
    BEGIN TRY
        -- Insert merged and unmerged rows
        INSERT INTO dbo.ContractTermBreakdown (
            ContractTermID,
            ContractID,
            BusinessUnitID,
            WDCompanyID,
            CategoryID,
            CostCenterID,
            TaxType,
            Fees
        )
        SELECT
            MIN(ct.ContractTermID),  -- one representative term ID per group
            ISNULL(p.ContractID, c.ContractID) AS MergedContractID,  -- use parent ID if eligible
            c.BusinessUnitID,
            c.WDCompanyID,
            c.CategoryID,
            c.CostCenterID,
            ct.TaxType,
            SUM(ct.Fees) AS TotalFees
        FROM ContractTerm ct
        INNER JOIN Contract c ON ct.ContractID = c.ContractID
        LEFT JOIN Contract p ON c.ParentContractID = p.ContractID 
                             AND p.ContractName LIKE '%Parent%'
        WHERE 
            p.ContractID IS NULL 
            OR (
                c.BusinessUnitID <> p.BusinessUnitID OR
                c.WDCompanyID    <> p.WDCompanyID OR
                c.CategoryID     <> p.CategoryID OR
                c.CostCenterID   <> p.CostCenterID
            )
            OR (
                p.ContractID IS NOT NULL AND
                c.BusinessUnitID = p.BusinessUnitID AND
                c.WDCompanyID    = p.WDCompanyID AND
                c.CategoryID     = p.CategoryID AND
                c.CostCenterID   = p.CostCenterID
            )
        GROUP BY 
            ISNULL(p.ContractID, c.ContractID),
            c.BusinessUnitID,
            c.WDCompanyID,
            c.CategoryID,
            c.CostCenterID,
            ct.TaxType;
    END TRY

    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();

        RAISERROR ('Error in PopulateContractTermBreakdown: %s',
                   @ErrorSeverity, @ErrorState, @ErrorMessage);
    END CATCH
END;
```

---

## 🔍 What This Does

* **`ISNULL(p.ContractID, c.ContractID)`**: If it can merge, use parent’s `ContractID`; else, use the contract’s own.
* **`SUM(ct.Fees)`**: Combines fees for multiple terms that can be merged.
* **`MIN(ct.ContractTermID)`**: Just uses one ID to satisfy the required column (optional: can switch to `NULL` if it's not meaningful).
* **No rows are skipped** — everything is either merged or added as-is.

---

Let me know if:

* You want to **retain the original ContractTermID** per row (instead of grouping)?
* You want to **log which contracts were merged**?
* You want to **preserve ParentContractID** too in the table?

I can update the design or script accordingly.



Absolutely — let’s update the table to include `ContractID` as well, so you can easily trace which contract each term breakdown belongs to.

---

## ✅ Updated `CREATE TABLE` Script (with `ContractID` added)

```sql
-- Drop if exists
IF OBJECT_ID('dbo.ContractTermBreakdown', 'U') IS NOT NULL
    DROP TABLE dbo.ContractTermBreakdown;

-- Create new table with ContractID included
CREATE TABLE dbo.ContractTermBreakdown (
    ContractTermBreakDownID INT IDENTITY(1,1) PRIMARY KEY,
    ContractTermID INT NOT NULL,
    ContractID INT NOT NULL,                 -- 🆕 Added this column
    BusinessUnitID INT,
    WDCompanyID INT,
    CategoryID INT,
    CostCenterID INT,
    TaxType NVARCHAR(100),
    Fees FLOAT,

    CONSTRAINT FK_ContractTermBreakdown_ContractTerm FOREIGN KEY (ContractTermID)
        REFERENCES ContractTerm(ContractTermID),

    CONSTRAINT FK_ContractTermBreakdown_Contract FOREIGN KEY (ContractID)
        REFERENCES Contract(ContractID)
);
```

---

## ✅ Update to Stored Procedure (Add `ContractID` to Insert)

Update the `INSERT INTO` and `SELECT` parts:

```sql
CREATE PROCEDURE dbo.PopulateContractTermBreakdown
AS
BEGIN
    BEGIN TRY
        INSERT INTO dbo.ContractTermBreakdown (
            ContractTermID,
            ContractID,          -- 🆕 Add here
            BusinessUnitID,
            WDCompanyID,
            CategoryID,
            CostCenterID,
            TaxType,
            Fees
        )
        SELECT
            ct.ContractTermID,
            c.ContractID,        -- 🆕 Add here
            c.BusinessUnitID,
            c.WDCompanyID,
            c.CategoryID,
            c.CostCenterID,
            ct.TaxType,
            ct.Fees
        FROM ContractTerm ct
        INNER JOIN Contract c ON ct.ContractID = c.ContractID
        LEFT JOIN Contract parent ON c.ParentContractID = parent.ContractID
        WHERE
            parent.ContractName LIKE '%Parent%'
            AND (
                c.BusinessUnitID <> parent.BusinessUnitID OR
                c.WDCompanyID     <> parent.WDCompanyID OR
                c.CategoryID      <> parent.CategoryID OR
                c.CostCenterID    <> parent.CostCenterID
            )
            AND NOT EXISTS (
                SELECT 1
                FROM dbo.ContractTermBreakdown b
                WHERE b.ContractTermID = ct.ContractTermID
            );
    END TRY

    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();

        RAISERROR ('Error in PopulateContractTermBreakdown: %s',
                   @ErrorSeverity, @ErrorState, @ErrorMessage);
    END CATCH
END;
```

---

Let me know if you want to include `ParentContractID` too — or any metadata like timestamps or who inserted it.


Perfect — here’s the **complete setup in two clean scripts**:

---

## 🔹 **Script 1: Drop and Create the `ContractTermBreakdown` Table**

```sql
-- Drop if exists
IF OBJECT_ID('dbo.ContractTermBreakdown', 'U') IS NOT NULL
    DROP TABLE dbo.ContractTermBreakdown;

-- Create new table
CREATE TABLE dbo.ContractTermBreakdown (
    ContractTermBreakDownID INT IDENTITY(1,1) PRIMARY KEY,
    ContractTermID INT NOT NULL,
    BusinessUnitID INT,
    WDCompanyID INT,
    CategoryID INT,
    CostCenterID INT,
    TaxType NVARCHAR(100),
    Fees DECIMAL(18, 2),

    CONSTRAINT FK_ContractTermBreakdown_ContractTerm FOREIGN KEY (ContractTermID)
        REFERENCES ContractTerm(ContractTermID)
);
```

> ✅ This will:
>
> * Remove the old table if it exists
> * Create a fresh table with identity PK and a foreign key to `ContractTerm`

---

## 🔹 **Script 2: Stored Procedure to Populate the Table (with TRY...CATCH)**

```sql
CREATE PROCEDURE dbo.PopulateContractTermBreakdown
AS
BEGIN
    BEGIN TRY
        INSERT INTO dbo.ContractTermBreakdown (
            ContractTermID,
            BusinessUnitID,
            WDCompanyID,
            CategoryID,
            CostCenterID,
            TaxType,
            Fees
        )
        SELECT
            ct.ContractTermID,
            c.BusinessUnitID,
            c.WDCompanyID,
            c.CategoryID,
            c.CostCenterID,
            ct.TaxType,
            ct.Fees
        FROM ContractTerm ct
        INNER JOIN Contract c ON ct.ContractID = c.ContractID
        LEFT JOIN Contract parent ON c.ParentContractID = parent.ContractID
        WHERE
            parent.ContractName LIKE '%Parent%'
            AND (
                c.BusinessUnitID <> parent.BusinessUnitID OR
                c.WDCompanyID     <> parent.WDCompanyID OR
                c.CategoryID      <> parent.CategoryID OR
                c.CostCenterID    <> parent.CostCenterID
            )
            AND NOT EXISTS (
                SELECT 1
                FROM dbo.ContractTermBreakdown b
                WHERE b.ContractTermID = ct.ContractTermID
            );
    END TRY

    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();

        RAISERROR ('Error occurred in PopulateContractTermBreakdown: %s',
                   @ErrorSeverity, @ErrorState, @ErrorMessage);
    END CATCH
END;
```

---

## ✅ Run Order

1. Run Script 1 to **create the table**
2. Run Script 2 to **create the procedure**
3. Execute the procedure:

```sql
EXEC dbo.PopulateContractTermBreakdown;
```

---

Let me know if you'd like to:

* Include `ContractID` or `ParentContractID` in the breakdown table
* Log inserted rows or errors
* Add a `CreatedDate` column

Happy to extend it further!
