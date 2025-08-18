using Microsoft.Extensions.DependencyInjection;
using SmartSpender.Core.Services;

namespace SmartSpender.Core
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddCoreServices(this IServiceCollection services)
        {
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IBusinessService, BusinessService>();
            services.AddScoped<IRawDataService, RawDataService>();
            services.AddScoped<IBusinessCategoryService, BusinessCategoryService>();
            services.AddScoped<IDataProcessingService, DataProcessingService>();

            return services;
        }
    }
}
