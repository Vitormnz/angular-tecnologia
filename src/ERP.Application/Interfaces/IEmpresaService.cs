using EPR.src.ERP.Application.DTOs;

namespace EPR.src.ERP.Application.Interfaces
{
    public interface IEmpresaService
    {
        Task<IEnumerable<EmpresaDto>> GetAllAsync();
        Task<EmpresaDto?> GetByIdAsync(Guid id);
        Task<EmpresaDto> CreateAsync(CreateEmpresaDto dto);
    }

}
