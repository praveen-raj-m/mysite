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