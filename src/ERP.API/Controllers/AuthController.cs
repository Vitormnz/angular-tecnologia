using EPR.src.ERP.Application.DTOs.Auth;
using EPR.src.ERP.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EPR.src.ERP.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto request)
        {
            try
            {
                var authResponse = await _authService.LoginAsync(request);
                return Ok(authResponse);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (Exception)
            {
                return Unauthorized(new { message = "E-mail ou senha inválidos." }); ;
            }
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto request)
        {
            try
            {
                var authResponse = await _authService.RegisterAsync(request);
                return Ok(authResponse);
            }
            catch (Exception)
            {
                return Unauthorized(new { message = "Não foi possível realizar o cadastro." });
            }
        }

        [HttpPost("refresh")]
        [AllowAnonymous]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequestDto request)
        {
            try
            {
                var authResponse = await _authService.RefreshTokenAsync(request);
                return Ok(authResponse);
            }
            catch (Exception)
            {
                return Unauthorized(new { message = "Sessão inválida ou expirada." });
            }
        }

    }
}