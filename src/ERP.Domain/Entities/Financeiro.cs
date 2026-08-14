using System.ComponentModel.DataAnnotations;

namespace EPR.src.ERP.Domain.Entities
{

    public class Conta : BaseEntity
    {
        [Required, MaxLength(100)] public string Nome { get; set; } = string.Empty;
        public decimal Saldo { get; set; }
        public Guid EmpresaId { get; set; }
        public Empresa Empresa { get; set; } = null!;
        public ICollection<Movimento> Movimentos { get; set; } = new List<Movimento>();
    }

    public class Categoria : BaseEntity
    {
        [Required, MaxLength(100)] public string Nome { get; set; } = string.Empty;
        public TipoMovimento Tipo { get; set; } // Receita ou Despesa
    }

    public class Movimento : BaseEntity
    {
        public decimal Valor { get; set; }
        public DateTime DataMovimento { get; set; }
        public string? Descricao { get; set; }
        public TipoMovimento Tipo { get; set; }

        public Guid ContaId { get; set; }
        public Conta Conta { get; set; } = null!;
        public Guid CategoriaId { get; set; }
        public Categoria Categoria { get; set; } = null!;
    }

    public enum TipoMovimento { Receita, Despesa }
}
