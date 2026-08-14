using Microsoft.EntityFrameworkCore;
using EPR.src.ERP.Application.DTOs.Auth;
using EPR.src.ERP.Application.Interfaces;
using EPR.src.ERP.Domain.Entities;
using EPR.src.ERP.Domain.Helper;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace EPR.src.ERP.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly ITokenService _tokenService;
        private readonly IConfiguration _configuration;

        public AuthService(AppDbContext context, ITokenService tokenService, IConfiguration configuration)
        {
            _context = context;
            _tokenService = tokenService;
            _configuration = configuration;
        }

        public async Task<AuthResponseDto> LoginAsync(LoginRequestDto request)
        {
            var user = await _context.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null || !PasswordHasher.VerifyPassword(request.Password, user.PasswordHash))
                throw new UnauthorizedAccessException("Credenciais inválidas.");

            return await GenerateAuthResponseAsync(user);
        }

        public async Task<AuthResponseDto> RegisterAsync(RegisterRequestDto request)
        {
            var userExists = await _context.Users.AnyAsync(u => u.Email == request.Email);
            if (userExists)
                throw new InvalidOperationException("E-mail já cadastrado.");

            var newUser = new User
            {
                Id = Guid.NewGuid(),
                Nome = request.Nome,
                Email = request.Email,
                PasswordHash = PasswordHasher.HashPassword(request.Password),
                EmpresaId = request.EmpresaId,
                RoleId = request.RoleId
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            var userWithRole = await _context.Users
                .Include(u => u.Role)
                .FirstAsync(u => u.Id == newUser.Id);

            return await GenerateAuthResponseAsync(userWithRole);
        }

        public async Task<AuthResponseDto> RefreshTokenAsync(RefreshTokenRequestDto request)
        {
            var savedToken = await _context.RefreshTokens
                .Include(t => t.User)
                .ThenInclude(u => u.Role)
                .FirstOrDefaultAsync(t => t.Token == request.RefreshToken);

            if (savedToken == null)
                throw new UnauthorizedAccessException("Refresh Token inválido.");

            // Detecção de fraude ou expiração
            if (savedToken.IsRevoked != null || DateTime.UtcNow >= savedToken.ExpiryDate)
            {
                // Derruba toda a família de tokens do usuário (Castigo de Segurança)
                var activeTokens = await _context.RefreshTokens
                    .Where(t => t.UserId == savedToken.UserId && t.IsRevoked == null)
                    .ToListAsync();

                foreach (var token in activeTokens)
                {
                    token.IsRevoked = true;
                }
                await _context.SaveChangesAsync();

                throw new UnauthorizedAccessException("Tentativa de fraude detectada. Token revogado.");
            }

            // Rotação: Invalida o token antigo utilizado
            savedToken.IsRevoked = true;

            // Cria o novo par usando seu TokenService
            var response = await GenerateAuthResponseAsync(savedToken.User);
            await _context.SaveChangesAsync();

            return response;
        }

        public async Task RevokeTokenAsync(string refreshToken)
        {
            var token = await _context.RefreshTokens
                .FirstOrDefaultAsync(t => t.Token == refreshToken);

            if (token != null && token.IsRevoked == null)
            {
                token.IsRevoked = true;
                await _context.SaveChangesAsync();
            }
        }

        public Task<TokenValidationResultDto> ValidateTokenAsync(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key não configurada."));

            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var userId = Guid.Parse(jwtToken.Claims.First(x => x.Type == System.Security.Claims.ClaimTypes.NameIdentifier).Value);
                var email = jwtToken.Claims.First(x => x.Type == System.Security.Claims.ClaimTypes.Email).Value;
                var role = jwtToken.Claims.First(x => x.Type == System.Security.Claims.ClaimTypes.Role).Value;

                return Task.FromResult(new TokenValidationResultDto(true, userId, email, role));
            }
            catch
            {
                return Task.FromResult(new TokenValidationResultDto(false, null, null, null));
            }
        }

        // Método auxiliar privado usando seu TokenService
        private async Task<AuthResponseDto> GenerateAuthResponseAsync(User user)
        {
            var accessToken = _tokenService.GenerateAccessToken(user);
            var refreshTokenString = _tokenService.GenerateRefreshTokenString();
            var expiration = DateTime.UtcNow.AddMinutes(2); // Alinhado com seus 2 minutos do TokenService

            var refreshTokenEntity = new RefreshToken
            {
                Id = Guid.NewGuid(),
                Token = refreshTokenString,
                ExpiryDate = DateTime.UtcNow.AddDays(7), // Longa duração no banco
                UserId = user.Id
            };

            _context.RefreshTokens.Add(refreshTokenEntity);
            await _context.SaveChangesAsync();

            return new AuthResponseDto(accessToken, refreshTokenString, expiration);
        }
    }
}