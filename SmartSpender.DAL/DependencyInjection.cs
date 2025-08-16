using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using SmartSpender.DAL.Models;
using SmartSpender.DAL.Repositories;
using SmartSpender.DAL.Services;

namespace SmartSpender.DAL
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddDataAccessLayer(this IServiceCollection services, IConfiguration configuration)
        {
            // The DbContext is configured with a hardcoded connection string in its OnConfiguring method.
            // This is not ideal. A better approach is to use the connection string from appsettings.json
            // and pass it here. For now, we register the DbContext and it will use the hardcoded string.
            services.AddDbContext<LlmfinanceContext>();

            // Register the generic repository
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

            // Register the business service
            services.AddScoped<IBusinessService, BusinessService>();

            return services;
        }
    }
}
