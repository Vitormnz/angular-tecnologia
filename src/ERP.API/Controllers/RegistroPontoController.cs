using EPR.src.ERP.Application.Interfaces;
using EPR.src.ERP.Application.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EPR.src.ERP.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class RegistroPontoController : ControllerBase
    {
        private readonly IRegistroPontoService _service;

        public RegistroPontoController(IRegistroPontoService service)
        {
            _service = service;
        }

        [HttpPost("bater-ponto")]
        public async Task<IActionResult> BaterPonto([FromBody] RegistroPontoInputDto inputDto)
        {
            var funcionarioIdClaim = User.FindFirst("FuncionarioId")?.Value;

            if (string.IsNullOrEmpty(funcionarioIdClaim) || !Guid.TryParse(funcionarioIdClaim, out Guid funcionarioId))
            {
                return Unauthorized(new { message = "Este usuário não possui um perfil de funcionário vinculado." });
            }

            var registroPontoDto = new RegistroPontoDto(funcionarioId, inputDto.Latitude, inputDto.Longitude);

            try
            {
                var result = await _service.BaterPontoAsync(registroPontoDto);
                return Ok(result);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }

}