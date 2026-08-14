using EPR.src.ERP.Application.DTOs;

namespace EPR.src.ERP.Application.Interfaces
{
    public interface IFuncionarioService
    {
        Task<IEnumerable<FuncionarioDto>> GetAllByEmpresaAsync(Guid empresaId);
        Task<FuncionarioDto> CreateAsync(CreateFuncionarioDto dto);
        Task<FuncionarioDto> UpdateAsync(Guid id, UpdateFuncionarioDto dto);
    }
}
