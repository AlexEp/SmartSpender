using Avalonia.Controls;

namespace SmartSpender.UI;

public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
        DataContext = new SmartSpender.UI.ViewModels.MainViewModel();
    }
}