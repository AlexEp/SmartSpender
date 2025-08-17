using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using my_test.Models.Entities;

namespace my_test.Models;

public partial class LlmfinanceContext : DbContext
{
    public LlmfinanceContext()
    {
    }

    public LlmfinanceContext(DbContextOptions<LlmfinanceContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Business> Businesses { get; set; }

    public virtual DbSet<BusinessCategory> BusinessCategories { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<RawDatum> RawData { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Business>(entity =>
        {
            entity.ToTable("Business");

            entity.Property(e => e.BusinessId).HasColumnName("BusinessID");
            entity.Property(e => e.Description).HasMaxLength(255);
        });

        modelBuilder.Entity<BusinessCategory>(entity =>
        {
            entity
              
                .ToTable("BusinessCategory");
            entity.HasKey(e => e.Id).HasName("ID");
            entity.Property(e => e.BusinessId).HasColumnName("BusinessID");
            entity.Property(e => e.CategoryId).HasColumnName("CategoryID");

            entity.HasOne(d => d.Business).WithMany()
                .HasForeignKey(d => d.BusinessId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BusinessCategory_Business");

            entity.HasOne(d => d.Category).WithMany()
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_BusinessCategory_Category");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK_RECORD_TYPE");

            entity.ToTable("Category");

            entity.Property(e => e.CategoryId).HasColumnName("CategoryID");
            entity.Property(e => e.CategoryName).HasMaxLength(255);
        });

        modelBuilder.Entity<RawDatum>(entity =>
        {
            entity.HasKey(e => e.DataId).HasName("PK__RAW_DATA__9D05305D2FE36D8B");

            entity.ToTable("RAW_DATA");

            entity.Property(e => e.DataId).HasColumnName("DataID");
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Description).HasMaxLength(255);
            entity.Property(e => e.IssueDate).HasColumnType("datetime");
            entity.Property(e => e.Price).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.Source).HasMaxLength(255);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
