<Window x:Class="OrderManagerApp.Views.SplashScreenWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="Order Manager"
        WindowStyle="None"
        ResizeMode="NoResize"
        WindowStartupLocation="CenterScreen"
        Width="450" Height="300"
        Background="Transparent"
        AllowsTransparency="True"
        ShowInTaskbar="False"
        Topmost="True">

    <Border CornerRadius="10" Background="#1E1E2F" BorderBrush="#3F51B5" BorderThickness="2" Padding="20">
        <Grid>
            <Grid.RowDefinitions>
                <RowDefinition Height="*"/>
                <RowDefinition Height="Auto"/>
            </Grid.RowDefinitions>

            <StackPanel Grid.Row="0" VerticalAlignment="Center" HorizontalAlignment="Center" Spacing="10">
                <TextBlock Text="Order Manager"
                           FontSize="28"
                           FontWeight="Bold"
                           Foreground="#FFFFFF"
                           HorizontalAlignment="Center"/>
                
                <TextBlock Text="Launching your workspace..."
                           FontSize="14"
                           Foreground="#CCCCCC"
                           HorizontalAlignment="Center"/>

                <ProgressBar Width="200" Height="8"
                             IsIndeterminate="True"
                             Foreground="#3F51B5"
                             Background="#2A2A3C"
                             Margin="0,20,0,0"
                             Style="{StaticResource {x:Static ToolBar.ProgressBarStyleKey}}"/>
            </StackPanel>

            <TextBlock Grid.Row="1"
                       Text="© 2025 OrderManager Inc."
                       FontSize="10"
                       Foreground="#666"
                       HorizontalAlignment="Center"
                       Margin="0,20,0,0"/>
        </Grid>
    </Border>
</Window>



using System.Threading.Tasks;
using System.Windows;
using OrderManagerApp.Views;

namespace OrderManagerApp
{
    public partial class App : Application
    {
        protected override void OnStartup(StartupEventArgs e)
        {
            base.OnStartup(e);

            var splash = new SplashScreenWindow();
            splash.Show();

            Task.Run(() =>
            {
                // Simulate startup work (load services, preload data, etc.)
                System.Threading.Thread.Sleep(2000);

                Dispatcher.Invoke(() =>
                {
                    splash.Close();

                    var mainWindow = new MainWindow();
                    mainWindow.Show();
                });
            });
        }
    }
}
