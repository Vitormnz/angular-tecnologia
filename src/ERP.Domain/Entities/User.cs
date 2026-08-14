using System.ComponentModel.DataAnnotations;

namespace EPR.src.ERP.Domain.Entities
{
    public class User : BaseEntity
    {
        [Required, MaxLength(100)] public string Nome { get; set; } = string.Empty;
        [Required, EmailAddress] public string Email { get; set; } = string.Empty;
        [Required] public string PasswordHash { get; set; } = string.Empty;

        public Guid EmpresaId { get; set; }
        public Empresa Empresa { get; set; } = null!;
        public Guid RoleId { get; set; }
        public Role Role { get; set; } = null!;

        public Guid? FuncionarioId { get; set; }
        public Funcionario? Funcionario { get; set; }

        public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
    }

    public class Role : BaseEntity
    {
        [Required, MaxLength(50)] public string Nome { get; set; } = string.Empty;
        public ICollection<User> Users { get; set; } = new List<User>();
    }
}
