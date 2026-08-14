using EPR.src.ERP.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    // Auth & Core
    public DbSet<Empresa> Empresas { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }

    // RH
    public DbSet<Funcionario> Funcionarios { get; set; }
    public DbSet<Cargo> Cargos { get; set; }

    public DbSet<RegistroPonto> RegistrosPonto { get; set; }

    // Financeiro
    public DbSet<Conta> Contas { get; set; }
    public DbSet<Categoria> Categorias { get; set; }
    public DbSet<Movimento> Movimentos { get; set; }

    // Patrimonio & EPI
    public DbSet<Ativo> Ativos { get; set; }
    public DbSet<EmprestimoAtivo> EmprestimosAtivos { get; set; }
    public DbSet<EPI> EPIS { get; set; }
    public DbSet<EntregaEPI> EntregasEPI { get; set; }

    // Auditoria
    public DbSet<AuditLog> AuditLogs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }

    // Override SaveChanges para atualizar UpdatedAt e gerar AuditLogs (Implementação resumida)
    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        foreach (var entry in ChangeTracker.Entries<BaseEntity>())
        {
            if (entry.State == EntityState.Modified) entry.Entity.UpdatedAt = DateTime.UtcNow;
        }
        return base.SaveChangesAsync(cancellationToken);
    }
}