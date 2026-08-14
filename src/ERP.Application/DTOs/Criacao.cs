namespace EPR.src.ERP.Application.DTOs
{
    public record EmpresaDto(Guid Id, string Nome, string Cnpj);
    public record CreateEmpresaDto(string Nome, string Cnpj, string? Endereco);
    public record FuncionarioDto(Guid Id, string Nome, string Cpf, string Cargo);
    public record CreateFuncionarioDto(string Nome, string Cpf, Guid CargoId, Guid EmpresaId);
    public record UpdateFuncionarioDto(string Nome, string Cpf, Guid CargoId);
}
