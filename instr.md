using DevExpress.Mvvm;
using System.Collections.ObjectModel;
using System.Data.Entity;
using System.Linq;
using System.Windows;
using System.Windows.Input;
using System.Collections.Specialized;
using System.Collections.Generic;

namespace YourAppNamespace.ViewModels
{
    public class OrdersViewModel : ViewModelBase
    {
        private ObservableCollection<Order> _orders;
        private NorthwindEntities _context;
        private readonly List<Order> _deletedOrders;

        public ObservableCollection<Order> Orders
        {
            get => _orders;
            set => SetProperty(ref _orders, value);
        }

        public ICommand SaveChangesCommand { get; }
        public ICommand RevertChangesCommand { get; }

        public OrdersViewModel()
        {
            _context = new NorthwindEntities();
            _deletedOrders = new List<Order>();

            SaveChangesCommand = new DelegateCommand(SaveChanges);
            RevertChangesCommand = new DelegateCommand(RevertChanges);

            LoadOrders();
        }

        private void LoadOrders()
        {
            var ordersList = _context.Orders.ToList();
            Orders = new ObservableCollection<Order>(ordersList);

            Orders.CollectionChanged += OnOrdersCollectionChanged;
        }

        private void OnOrdersCollectionChanged(object sender, NotifyCollectionChangedEventArgs e)
        {
            if (e.OldItems != null)
            {
                foreach (Order oldOrder in e.OldItems)
                {
                    if (oldOrder.OrderID != 0)
                        _deletedOrders.Add(oldOrder);
                }
            }
        }

        private void SaveChanges()
        {
            // Track modified and added entities
            foreach (var order in Orders)
            {
                if (order.OrderID == 0)
                {
                    _context.Orders.Add(order); // New order
                }
                else
                {
                    _context.Entry(order).State = EntityState.Modified; // Edited order
                }
            }

            // Track deletions
            foreach (var deleted in _deletedOrders)
            {
                _context.Entry(deleted).State = EntityState.Deleted;
            }

            _context.SaveChanges();
            MessageBox.Show("Changes saved successfully.");

            // Reload from DB to sync IDs and state
            RevertChanges();
        }

        private void RevertChanges()
        {
            _deletedOrders.Clear();

            _context.Dispose(); // Dispose old context
            _context = new NorthwindEntities(); // Create fresh one

            var freshOrders = _context.Orders.ToList();
            Orders = new ObservableCollection<Order>(freshOrders);

            Orders.CollectionChanged += OnOrdersCollectionChanged;

            MessageBox.Show("Reverted. All unsaved changes have been discarded.");
        }
    }
}


using System.Windows;
using YourApp.Models; // Or wherever your Order model is

namespace YourApp.Views
{
    public partial class OrderEditView : Window
    {
        public Order Order { get; set; }

        public OrderEditView(Order order)
        {
            InitializeComponent();

            // Clone if needed to allow cancel
            Order = order;
            DataContext = this;
        }

        private void Ok_Click(object sender, RoutedEventArgs e)
        {
            DialogResult = true;
            Close();
        }

        private void Cancel_Click(object sender, RoutedEventArgs e)
        {
            DialogResult = false;
            Close();
        }
    }
}



<Window x:Class="YourApp.Views.OrderEditView"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="Edit Order" Height="300" Width="400"
        WindowStartupLocation="CenterScreen"
        ResizeMode="NoResize"
        WindowStyle="SingleBorderWindow">
    
    <Grid Margin="20">
        <Grid.RowDefinitions>
            <RowDefinition Height="Auto"/>
            <RowDefinition Height="Auto"/>
            <RowDefinition Height="*"/>
        </Grid.RowDefinitions>

        <StackPanel Orientation="Vertical" Margin="0,0,0,10">
            <TextBlock Text="Order ID:"/>
            <TextBox Text="{Binding Order.OrderID}" IsReadOnly="True" Margin="0,5,0,10"/>
            
            <TextBlock Text="Customer ID:"/>
            <TextBox Text="{Binding Order.CustomerID}" Margin="0,5,0,10"/>

            <TextBlock Text="Order Date:"/>
            <DatePicker SelectedDate="{Binding Order.OrderDate}" Margin="0,5,0,10"/>
        </StackPanel>

        <StackPanel Grid.Row="2" Orientation="Horizontal" HorizontalAlignment="Right" Margin="0,10,0,0">
            <Button Content="OK" Width="80" Margin="0,0,10,0" Click="Ok_Click"/>
            <Button Content="Cancel" Width="80" Click="Cancel_Click"/>
        </StackPanel>
    </Grid>
</Window>








using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using DevExpress.Xpf.Grid;
using OrderManagerApp.Models;      // Adjust if your EDMX namespace is different
using OrderManagerApp.ViewModels; // For OrdersViewModel
using OrderManagerApp.Views;      // For OrderEditView

namespace OrderManagerApp.Views
{
    public partial class OrdersView : UserControl
    {
        public OrdersView()
        {
            InitializeComponent();
        }

        private void OrdersGrid_MouseDoubleClick(object sender, MouseButtonEventArgs e)
        {
            var viewModel = DataContext as OrdersViewModel;
            if (viewModel == null) return;

            // Get selected order
            if (ordersGrid.CurrentItem is Order selectedOrder)
            {
                // Clone selected order for safe editing
                var editableCopy = new Order
                {
                    OrderID = selectedOrder.OrderID,
                    CustomerID = selectedOrder.CustomerID,
                    OrderDate = selectedOrder.OrderDate,
                    ShipCountry = selectedOrder.ShipCountry
                    // Add more properties if needed
                };

                var dialog = new OrderEditView(editableCopy);
                if (dialog.ShowDialog() == true)
                {
                    // Update original object from dialog values
                    selectedOrder.CustomerID = dialog.Order.CustomerID;
                    selectedOrder.OrderDate = dialog.Order.OrderDate;
                    selectedOrder.ShipCountry = dialog.Order.ShipCountry;
                    // Update more fields if necessary
                }
            }
        }
    }
}
