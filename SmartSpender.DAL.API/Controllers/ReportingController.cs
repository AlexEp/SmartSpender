using Microsoft.AspNetCore.Mvc;
using SmartSpender.Core.DTOs;
using SmartSpender.Core.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SmartSpender.DAL.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportingController : ControllerBase
    {
        private readonly IReportingService _reportingService;

        public ReportingController(IReportingService reportingService)
        {
            _reportingService = reportingService;
        }

        [HttpGet("category-monthly-pie-chart")]
        public async Task<ActionResult<IEnumerable<CategoryMonthlyPieChartDto>>> GetCategoryMonthlyPieChart(int year, int month)
        {
            var data = await _reportingService.GetCategoryMonthlyPieChartAsync(year, month);
            return Ok(data);
        }

        [HttpGet("transactions/{year}/{month}/{categoryName}")]
        public async Task<ActionResult<IEnumerable<TransactionDto>>> GetTransactions(int year, int month, string categoryName)
        {
            var data = await _reportingService.GetTransactionsForCategoryAsync(year, month, categoryName);
            return Ok(data);
        }
    }
}
