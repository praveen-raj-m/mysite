<UserControl x:Class="OrderManagerApp.Views.OrdersView"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
             xmlns:dxg="http://schemas.devexpress.com/winfx/2008/xaml/grid"
             xmlns:vm="clr-namespace:OrderManagerApp.ViewModels"
             mc:Ignorable="d">

    <UserControl.DataContext>
        <vm:OrdersViewModel/>
    </UserControl.DataContext>

    <Grid>
        <StackPanel>
            <dxg:GridControl ItemsSource="{Binding Orders}" AutoGenerateColumns="AddNew">
                <dxg:GridControl.View>
                    <dxg:TableView AllowEditing="True" AllowDeleting="True" AllowAddingNew="True" NewItemRowPosition="Top"/>
                </dxg:GridControl.View>
            </dxg:GridControl>

            <Button Content="Save Changes" Width="120" Margin="10"
                    HorizontalAlignment="Right"
                    Command="{Binding SaveCommand}"/>
        </StackPanel>
    </Grid>
</UserControl>