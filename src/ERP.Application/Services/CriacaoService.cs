using EPR.src.ERP.Application.DTOs;
using EPR.src.ERP.Application.Interfaces;
using EPR.src.ERP.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace EPR.src.ERP.Application.Services
{
    public class EmpresaService : IEmpresaService
    {
        private readonly AppDbContext _context;

        public EmpresaService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<EmpresaDto>> GetAllAsync()
        {
            var empresas = await _context.Empresas.ToListAsync();
            return empresas.Select(e => new EmpresaDto(e.Id, e.Nome, e.Cnpj));
        }

        public async Task<EmpresaDto?> GetByIdAsync(Guid id)
        {
            var empresa = await _context.Empresas.FindAsync(id);
            return empresa == null ? null : new EmpresaDto(empresa.Id, empresa.Nome, empresa.Cnpj);
        }

        public async Task<EmpresaDto> CreateAsync(CreateEmpresaDto dto)
        {
            var empresa = new Empresa { Nome = dto.Nome, Cnpj = dto.Cnpj, Endereco = dto.Endereco };

            await _context.Empresas.AddAsync(empresa);
            await _context.SaveChangesAsync();

            return new EmpresaDto(empresa.Id, empresa.Nome, empresa.Cnpj);
        }
    }

    public class FuncionarioService : IFuncionarioService
    {
        private readonly AppDbContext _context;

        public FuncionarioService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<FuncionarioDto>> GetAllByEmpresaAsync(Guid empresaId)
        {

            var funcionarios = await _context.Funcionarios
                .Include(f => f.Cargo)
                .Where(f => f.EmpresaId == empresaId)
                .ToListAsync();

            return funcionarios.Select(f => new FuncionarioDto(f.Id, f.Nome, f.Cpf, f.Cargo.Nome));
        }

        public async Task<FuncionarioDto> CreateAsync(CreateFuncionarioDto dto)
        {
            var cargo = await _context.Cargos.FindAsync(dto.CargoId)
                ?? throw new Exception("Cargo não encontrado");

            var funcionario = new Funcionario
            {
                Nome = dto.Nome,
                Cpf = dto.Cpf,
                CargoId = dto.CargoId,
                EmpresaId = dto.EmpresaId,
                DataAdmissao = DateTime.UtcNow
            };

            await _context.Funcionarios.AddAsync(funcionario);
            await _context.SaveChangesAsync();

            return new FuncionarioDto(funcionario.Id, funcionario.Nome, funcionario.Cpf, cargo.Nome);
        }

        public async Task<FuncionarioDto?> UpdateAsync(Guid id, UpdateFuncionarioDto dto)
        {
            var funcionario = await _context.Funcionarios.FindAsync(id);
            if (funcionario == null) return null;

            var cargo = await _context.Cargos.FindAsync(dto.CargoId)
                ?? throw new Exception("Cargo não encontrado");

            funcionario.Nome = dto.Nome;
            funcionario.Cpf = dto.Cpf;
            funcionario.CargoId = dto.CargoId;
            funcionario.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return new FuncionarioDto(funcionario.Id, funcionario.Nome, funcionario.Cpf, cargo.Nome);
        }
    }
}
