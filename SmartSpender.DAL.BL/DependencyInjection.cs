using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using SmartSpender.DAL.BL.Models;
using SmartSpender.DAL.BL.Repositories;
using SmartSpender.DAL.BL.Services;

namespace SmartSpender.DAL.BL
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddDataAccessLayer(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<LlmfinanceContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            // Register the generic repository
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

            // Register the business service
            services.AddScoped<IBusinessService, BusinessService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IBusinessCategoryService, BusinessCategoryService>();
            services.AddScoped<IRawDataService, RawDataService>();
            services.AddScoped<IDataProcessingService, DataProcessingService>();

            return services;
        }
    }
}
