using System;

namespace SmartSpender.Core.DTOs
{
    public class CreateRawDataDto
    {
        public string? Source { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public DateTime? IssueDate { get; set; }
    }
}
