using SmartSpender.Core.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SmartSpender.Core.Services
{
    public interface IReportingService
    {
        Task<IEnumerable<CategoryMonthlySummaryDto>> GetCategoryMonthlySummaryAsync(int categoryId);
        Task<IEnumerable<CategoryMonthlyPieChartDto>> GetCategoryMonthlyPieChartAsync(int year, int month);
    }
}
