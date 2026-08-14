using System.ComponentModel.DataAnnotations;

namespace EPR.src.ERP.Domain.Entities
{
    public class Ativo : BaseEntity
    {
        [Required, MaxLength(150)] public string Nome { get; set; } = string.Empty;
        public string? NumeroPatrimonio { get; set; }
        public StatusAtivo Status { get; set; } = StatusAtivo.Disponivel;
        public Guid EmpresaId { get; set; }
        public Empresa Empresa { get; set; } = null!;
    }
    public enum StatusAtivo { Disponivel, Emprestado, EmManutencao, Baixado }

    public class EmprestimoAtivo : BaseEntity
    {
        public DateTime DataEmprestimo { get; set; }
        public DateTime? DataDevolucao { get; set; }

        public Guid AtivoId { get; set; }
        public Ativo Ativo { get; set; } = null!;
        public Guid FuncionarioId { get; set; }
        public Funcionario Funcionario { get; set; } = null!;
    }

    public class EPI : BaseEntity
    {
        [Required, MaxLength(150)] public string Nome { get; set; } = string.Empty;
        public string? CA { get; set; } // Certificado de Aprovação
        public int QuantidadeEmEstoque { get; set; }
    }

    public class EntregaEPI : BaseEntity
    {
        public DateTime DataEntrega { get; set; }
        public int Quantidade { get; set; }

        public Guid EPIId { get; set; }
        public EPI EPI { get; set; } = null!;
        public Guid FuncionarioId { get; set; }
        public Funcionario Funcionario { get; set; } = null!;
    }
}
