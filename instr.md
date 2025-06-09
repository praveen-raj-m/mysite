Great! Here's the **complete working solution** for using a **stored procedure to save orders (insert/update/delete) in a single batch** using WPF + Entity Framework + SQL Server.

---

## ✅ 1. SQL Server Setup

### 📌 Step 1.1: Create a Table-Valued Parameter (TVP)

```sql
CREATE TYPE dbo.OrderUpdateType AS TABLE
(
    OrderID INT NULL,
    CustomerID NVARCHAR(5),
    OrderDate DATETIME,
    ShipCountry NVARCHAR(50),
    ActionType NVARCHAR(10) -- 'Insert', 'Update', 'Delete'
);
```

---

### 📌 Step 1.2: Create the Stored Procedure

```sql
CREATE PROCEDURE dbo.SaveOrdersBatch
    @Orders dbo.OrderUpdateType READONLY
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;

    BEGIN TRY
        -- Delete Orders
        DELETE o
        FROM Orders o
        JOIN @Orders u ON o.OrderID = u.OrderID
        WHERE u.ActionType = 'Delete';

        -- Update Orders
        UPDATE o
        SET o.CustomerID = u.CustomerID,
            o.OrderDate = u.OrderDate,
            o.ShipCountry = u.ShipCountry
        FROM Orders o
        JOIN @Orders u ON o.OrderID = u.OrderID
        WHERE u.ActionType = 'Update';

        -- Insert Orders
        INSERT INTO Orders (CustomerID, OrderDate, ShipCountry)
        SELECT CustomerID, OrderDate, ShipCountry
        FROM @Orders
        WHERE ActionType = 'Insert';

        COMMIT;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        THROW;
    END CATCH
END
```

---

## ✅ 2. C# Integration (WPF Side)

### 📌 Step 2.1: Create Save Method in ViewModel or DataService

```csharp
using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.ObjectModel;
using YourApp.Models; // replace with your actual namespace

public class OrderService
{
    private readonly string _connectionString = "YourConnectionStringHere"; // App.config connection string

    public void SaveOrdersUsingStoredProc(ObservableCollection<Order> orders, 
                                          ObservableCollection<Order> deletedOrders)
    {
        DataTable changesTable = new DataTable();
        changesTable.Columns.Add("OrderID", typeof(int));
        changesTable.Columns.Add("CustomerID", typeof(string));
        changesTable.Columns.Add("OrderDate", typeof(DateTime));
        changesTable.Columns.Add("ShipCountry", typeof(string));
        changesTable.Columns.Add("ActionType", typeof(string));

        // Add deleted orders
        foreach (var order in deletedOrders)
        {
            changesTable.Rows.Add(order.OrderID, DBNull.Value, DBNull.Value, DBNull.Value, "Delete");
        }

        // Add inserted or updated orders
        foreach (var order in orders)
        {
            if (order.OrderID == 0)
            {
                changesTable.Rows.Add(DBNull.Value, order.CustomerID, order.OrderDate, order.ShipCountry, "Insert");
            }
            else
            {
                changesTable.Rows.Add(order.OrderID, order.CustomerID, order.OrderDate, order.ShipCountry, "Update");
            }
        }

        using (var conn = new SqlConnection(_connectionString))
        using (var cmd = new SqlCommand("dbo.SaveOrdersBatch", conn))
        {
            cmd.CommandType = CommandType.StoredProcedure;

            var param = cmd.Parameters.AddWithValue("@Orders", changesTable);
            param.SqlDbType = SqlDbType.Structured;

            conn.Open();
            cmd.ExecuteNonQuery();
        }
    }
}
```

---

## ✅ 3. How to Use This in ViewModel

Call it like this when your **Save Changes** button is clicked:

```csharp
var service = new OrderService();
service.SaveOrdersUsingStoredProc(Orders, DeletedOrders);
```

Make sure:

* `Orders` is your `ObservableCollection<Order>`
* `DeletedOrders` is tracked when you delete items from the UI (just store removed ones temporarily)

---

## ⚠️ Notes

* Make sure the `OrderID` in inserted rows is `0` or `null`, since SQL will generate it
* If you want SQL to return new `OrderID`s, we can modify the procedure to return those too
* Add error handling in production (try/catch, logging)

---

## ✅ Summary

| Layer | Action                                                                    |
| ----- | ------------------------------------------------------------------------- |
| SQL   | `OrderUpdateType` + `SaveOrdersBatch` handle all logic in one transaction |
| C#    | Convert objects to `DataTable`, send to stored proc                       |
| UI    | Works like before — just calls a service class to commit changes          |

---

Would you like to:

* Track user and timestamp for each change?
* Return inserted IDs back to C#?
* Wrap this in a background task for smoother UI?

Let me know and I’ll add those too.
