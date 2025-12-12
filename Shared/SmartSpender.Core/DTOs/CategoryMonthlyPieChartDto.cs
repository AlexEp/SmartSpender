namespace SmartSpender.Core.DTOs
{
    public class CategoryMonthlyPieChartDto
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public decimal TotalPrice { get; set; }
        public int TotalEntries { get; set; }
    }
}
