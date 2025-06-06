using DevExpress.Mvvm; // For DelegateCommand
using System.Windows.Input;

public class OrdersViewModel : ViewModelBase
{
    private ObservableCollection<Order> _orders;
    public ObservableCollection<Order> Orders
    {
        get => _orders;
        set => SetProperty(ref _orders, value);
    }

    public ICommand SaveChangesCommand { get; }

    private List<Order> _deletedOrders = new List<Order>();
    private NorthwindEntities _context;

    public OrdersViewModel()
    {
        _context = new NorthwindEntities();
        SaveChangesCommand = new DelegateCommand(SaveChanges);
        LoadOrders();
    }

    private void LoadOrders()
    {
        var ordersFromDb = _context.Orders.ToList();
        Orders = new ObservableCollection<Order>(ordersFromDb);

        // Track deleted rows manually
        Orders.CollectionChanged += (s, e) =>
        {
            if (e.OldItems != null)
            {
                foreach (Order oldOrder in e.OldItems)
                {
                    if (oldOrder.OrderID != 0) // Make sure it's from DB
                        _deletedOrders.Add(oldOrder);
                }
            }
        };
    }

    private void SaveChanges()
    {
        foreach (var order in Orders)
        {
            if (order.OrderID == 0)
            {
                _context.Orders.Add(order); // New row
            }
            else
            {
                _context.Entry(order).State = System.Data.Entity.EntityState.Modified;
            }
        }

        foreach (var deletedOrder in _deletedOrders)
        {
            _context.Entry(deletedOrder).State = System.Data.Entity.EntityState.Deleted;
        }

        _context.SaveChanges();

        MessageBox.Show("Changes saved to database!");
        _deletedOrders.Clear();
    }
}

<StackPanel Orientation="Vertical">
    <dxg:GridControl ItemsSource="{Binding Orders}" AutoGenerateColumns="AddNew">
        <dxg:GridControl.View>
            <dxg:TableView AllowEditing="True" AllowDeleting="True" AllowAddingNew="True" ShowGroupPanel="False" />
        </dxg:GridControl.View>
    </dxg:GridControl>

    <Button Content="Save Changes"
            Command="{Binding SaveChangesCommand}"
            Margin="5"
            Width="150"
            HorizontalAlignment="Left"/>
</StackPanel>


 // Reload data from the database
    var freshOrders = _context.Orders.ToList();
    Orders = new ObservableCollection<Order>(freshOrders);

    // Reattach delete tracker to new collection
    Orders.CollectionChanged += (s, e) =>
    {
        if (e.OldItems != null)
        {
            foreach (Order oldOrder in e.OldItems)
            {
                if (oldOrder.OrderID != 0)
                    _deletedOrders.Add(oldOrder);
            }
        }
    };

    MessageBox.Show("Changes reverted. Data reloaded from the database.");




