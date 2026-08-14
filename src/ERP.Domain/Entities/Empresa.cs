using System.ComponentModel.DataAnnotations;

namespace EPR.src.ERP.Domain.Entities
{
    public class Empresa : BaseEntity
    {
        [Required, MaxLength(150)] public string Nome { get; set; } = string.Empty;
        [Required, MaxLength(18)] public string Cnpj { get; set; } = string.Empty;
        public string? Endereco { get; set; }

        public ICollection<Funcionario> Funcionarios { get; set; } = new List<Funcionario>();
        public ICollection<User> Users { get; set; } = new List<User>();
    }
}
