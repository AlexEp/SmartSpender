using Avalonia;
using Avalonia.Controls.ApplicationLifetimes;
using Avalonia.Markup.Xaml;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace SmartSpender.UI;

public partial class App : Application
{
    private readonly IServiceProvider _serviceProvider;

    public App() { } // For the designer

    public App(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public override void Initialize()
    {
        AvaloniaXamlLoader.Load(this);
    }

    public override void OnFrameworkInitializationCompleted()
    {
        if (ApplicationLifetime is IClassicDesktopStyleApplicationLifetime desktop)
        {
            desktop.MainWindow = new MainWindow
            {
                DataContext = _serviceProvider.GetRequiredService<ViewModels.MainViewModel>()
            };
        }

        base.OnFrameworkInitializationCompleted();
    }
}