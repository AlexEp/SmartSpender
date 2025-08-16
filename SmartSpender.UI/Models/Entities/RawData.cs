using System;
using System.Collections.Generic;

namespace SmartSpender.UI.Models.Entities;

public partial class RawData
{
    public int DataId { get; set; }

    public string? Source { get; set; }

    public string? Description { get; set; }

    public decimal? Price { get; set; }

    public DateTime? IssueDate { get; set; }

    public DateTime? CreatedDate { get; set; }
}
