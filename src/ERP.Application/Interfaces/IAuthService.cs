using EPR.src.ERP.Application.DTOs.Auth;

namespace EPR.src.ERP.Application.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDto> LoginAsync(LoginRequestDto request);
        Task<AuthResponseDto> RegisterAsync(RegisterRequestDto request);
        Task<AuthResponseDto> RefreshTokenAsync(RefreshTokenRequestDto request);
        Task RevokeTokenAsync(string refreshToken);
        Task<TokenValidationResultDto> ValidateTokenAsync(string token);
    }
}
