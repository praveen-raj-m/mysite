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