using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using SmartSpender.UI.Models;
using SmartSpender.UI.Services;

namespace SmartSpender.UI
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddUIServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<LlmfinanceContext>(options =>
                options.UseSqlite(configuration.GetConnectionString("DefaultConnection")));

            services.AddTransient<BusinessCategoryProcessor>();
            services.AddTransient<ExcelDataImporter>();
            services.AddTransient<ExelFileDB>();
            services.AddTransient<RawDataToBusinessProcessor>();

            return services;
        }
    }
}
