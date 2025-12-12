namespace SmartSpender.Core.DTOs
{
    public class CategoryMonthlySummaryDto
    {
        public int Year { get; set; }
        public int Month { get; set; }
        public int TotalEntries { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
