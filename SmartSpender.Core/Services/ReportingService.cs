using Microsoft.EntityFrameworkCore;
using SmartSpender.Core.DTOs;
using SmartSpender.Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SmartSpender.Core.Services
{
    public class ReportingService : IReportingService
    {
        private readonly LlmfinanceContext _context;

        public ReportingService(LlmfinanceContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CategoryMonthlySummaryDto>> GetCategoryMonthlySummaryAsync(int categoryId)
        {
            var query = @"
                SELECT
                    YEAR(RD.IssueDate) AS Year,
                    MONTH(RD.IssueDate) AS Month,
                    COUNT(RD.DataID) AS TotalEntries,
                    SUM(RD.Price) AS TotalPrice
                FROM dbo.RAW_DATA RD
                JOIN dbo.Business B ON RD.Description = B.Description
                JOIN dbo.BusinessCategory BC ON B.BusinessID = BC.BusinessID
                JOIN dbo.Category C ON BC.CategoryID = C.CategoryID
                WHERE C.CategoryID = {0}
                AND B.BusinessID IN (
                    SELECT BC.BusinessID
                    FROM dbo.BusinessCategory BC
                    JOIN dbo.Category C ON BC.CategoryID = C.CategoryID
                    GROUP BY BC.BusinessID
                    HAVING COUNT(DISTINCT BC.CategoryID) = 1
                )
                GROUP BY YEAR(RD.IssueDate), MONTH(RD.IssueDate)
                ORDER BY Year DESC, Month DESC;";

            return await _context.CategoryMonthlySummaries.FromSqlRaw(query, categoryId).ToListAsync();
        }

        public async Task<IEnumerable<CategoryMonthlyPieChartDto>> GetCategoryMonthlyPieChartAsync(int year, int month)
        {
            var query = @"
                SELECT
                    C.CategoryID AS CategoryId,
                    C.CategoryName,
                    SUM(RD.Price) AS TotalPrice,
                    COUNT(RD.DataID) AS TotalEntries
                FROM dbo.RAW_DATA RD
                JOIN dbo.Business B ON RD.Description = B.Description
                JOIN dbo.BusinessCategory BC ON B.BusinessID = BC.BusinessID
                JOIN dbo.Category C ON BC.CategoryID = C.CategoryID
                WHERE YEAR(RD.IssueDate) = {0} AND MONTH(RD.IssueDate) = {1}
                GROUP BY C.CategoryID, C.CategoryName
                ORDER BY TotalPrice DESC";

            return await _context.CategoryMonthlyPieChart.FromSqlRaw(query, year, month).ToListAsync();
        }
    }
}
