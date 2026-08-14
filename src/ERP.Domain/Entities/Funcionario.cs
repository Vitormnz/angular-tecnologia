using System.ComponentModel.DataAnnotations;

namespace EPR.src.ERP.Domain.Entities
{
    public class Funcionario : BaseEntity
    {
        [Required, MaxLength(150)] public string Nome { get; set; } = string.Empty;
        [Required, MaxLength(14)] public string Cpf { get; set; } = string.Empty;
        public DateTime DataAdmissao { get; set; }

        public Guid CargoId { get; set; }
        public Cargo Cargo { get; set; } = null!;
        public Guid EmpresaId { get; set; }
        public Empresa Empresa { get; set; } = null!;
    }

    public class Cargo : BaseEntity
    {
        [Required, MaxLength(100)] public string Nome { get; set; } = string.Empty;
        public string? Descricao { get; set; }
    }
}
