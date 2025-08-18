using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SmartSpender.Core;
using SmartSpender.DAL.BL;
using SmartSpender.UI.Repositories;
using SmartSpender.UI.Services;

namespace SmartSpender.UI;

public static class DependencyInjection
{
    public static IServiceCollection AddUIServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDalServices(configuration);
        services.AddCoreServices();

        services.AddTransient<ExcelImportService>();
        services.AddTransient<IRepository, Repository>();

        return services;
    }
}
