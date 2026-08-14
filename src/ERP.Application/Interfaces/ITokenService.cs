using EPR.src.ERP.Domain.Entities;

namespace EPR.src.ERP.Application.Interfaces
{
    public interface ITokenService
    {
        string GenerateAccessToken(User user);
        string GenerateRefreshTokenString();
    }
}
