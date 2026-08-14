using System.ComponentModel.DataAnnotations;

namespace EPR.src.ERP.Domain.Entities
{
    public class RegistroPonto : BaseEntity
    {
        [Required]
        public Guid FuncionarioId { get; set; }
        public Funcionario Funcionario { get; set; } = null!;

        [Required]
        public DateTime DataHora { get; set; }

        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
    }
}
