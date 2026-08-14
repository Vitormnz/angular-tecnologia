using System.ComponentModel.DataAnnotations;

namespace EPR.src.ERP.Domain.Entities
{
    public class RefreshToken : BaseEntity
    {
        [Required] public string Token { get; set; } = string.Empty;
        public DateTime ExpiryDate { get; set; }
        public bool IsRevoked { get; set; }

        public Guid UserId { get; set; }
        public User User { get; set; } = null!;
    }
}
