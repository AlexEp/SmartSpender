using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SmartSpender.Core.Models.Entities;

public partial class BusinessCategory
{
    [Key]
    public int Id { get; set; }

    public int BusinessId { get; set; }

    public int CategoryId { get; set; }

    public virtual Business Business { get; set; } = null!;

    public virtual Category Category { get; set; } = null!;
}
