using EPR.src.ERP.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EPR.src.ERP.Infrastructure.Configuration
{
    public class EmpresaConfiguration : IEntityTypeConfiguration<Empresa>
    {
        public void Configure(EntityTypeBuilder<Empresa> builder)
        {
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Cnpj).IsRequired().HasMaxLength(18);
            builder.HasIndex(e => e.Cnpj).IsUnique();

            builder.HasMany(e => e.Funcionarios).WithOne(f => f.Empresa).HasForeignKey(f => f.EmpresaId).OnDelete(DeleteBehavior.Restrict);
        }
    }
}
