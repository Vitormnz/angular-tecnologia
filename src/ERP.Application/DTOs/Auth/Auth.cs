namespace EPR.src.ERP.Application.DTOs.Auth
{
    public record LoginRequestDto(string Email, string Password);

    public record RegisterRequestDto(string Nome, string Email, string Password, Guid EmpresaId, Guid RoleId);

    public record AuthResponseDto(string AccessToken, string RefreshToken, DateTime Expiration);

    public record RefreshTokenRequestDto(string RefreshToken);

    public record TokenValidationResultDto(bool IsValid, Guid? UserId, string? Email, string? Role);
}
