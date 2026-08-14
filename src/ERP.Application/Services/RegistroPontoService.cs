using EPR.src.ERP.Application.Interfaces;
using EPR.src.ERP.Domain.Entities;
using EPR.src.ERP.Application.DTOs;
using Microsoft.EntityFrameworkCore;

namespace EPR.src.ERP.Application.Services
{
    public class RegistroPontoService : IRegistroPontoService
    {
        private readonly AppDbContext _context;

        public RegistroPontoService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<RegistroPontoDto> BaterPontoAsync(RegistroPontoDto dto)
        {
            var existeFuncionario = await _context.Funcionarios.AnyAsync(f => f.Id == dto.FuncionarioId);
            if (!existeFuncionario)
            {
                throw new InvalidOperationException("Funcionário não encontrado.");
            }

            var novoRegistro = new RegistroPonto
            {
                FuncionarioId = dto.FuncionarioId,
                Latitude = dto.Latitude,
                Longitude = dto.Longitude,
                DataHora = DateTime.UtcNow
            };

            await _context.SaveChangesAsync();
            return dto;
        }
    }
}
