using EPR.src.ERP.Application.DTOs;
using EPR.src.ERP.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EPR.src.ERP.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class FuncionariosController : ControllerBase
    {
        private readonly IFuncionarioService _service;
        public FuncionariosController(IFuncionarioService service)
        {
            _service = service;
        }

        [HttpGet("empresa/{empresaId}")]
        [Authorize(Roles = "Admin,Gerente")]
        public async Task<IActionResult> GetByEmpresa(Guid empresaId) => Ok(await _service.GetAllByEmpresaAsync(empresaId));

        [HttpPost]
        [Authorize(Roles = "Admin,Gerente")]
        public async Task<IActionResult> Create([FromBody] CreateFuncionarioDto dto)
        {
            var result = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetByEmpresa), new { empresaId = dto.EmpresaId }, result);
        }

        [HttpPost("atualizar/{id}")]
        [Authorize(Roles = "Admin,Gerente")]

        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateFuncionarioDto dto)
        {
            var result = await _service.UpdateAsync(id, dto);
            return result == null ? NotFound() : Ok(result);
        }
    }
}
