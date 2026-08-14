using EPR.src.ERP.Application.DTOs;
namespace EPR.src.ERP.Application.Interfaces
{
    public interface IRegistroPontoService
    {
        Task<RegistroPontoDto?> BaterPontoAsync(RegistroPontoDto dto);
    }
}
