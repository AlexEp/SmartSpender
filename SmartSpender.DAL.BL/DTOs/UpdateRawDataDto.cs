using System;

namespace SmartSpender.DAL.BL.DTOs
{
    public class UpdateRawDataDto
    {
        public string? Source { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public DateTime? IssueDate { get; set; }
    }
}
