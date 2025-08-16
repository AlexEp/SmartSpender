using System;
using System.Collections.Generic;

namespace SmartSpender.API.Models.Entities;

public partial class RawDatum
{
    public int DataId { get; set; }

    public string? Source { get; set; }

    public string? Description { get; set; }

    public decimal? Price { get; set; }

    public DateTime? IssueDate { get; set; }

    public DateTime? CreatedDate { get; set; }
}
