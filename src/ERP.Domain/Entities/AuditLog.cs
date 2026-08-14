namespace EPR.src.ERP.Domain.Entities
{
    public class AuditLog : BaseEntity
    {
        public Guid? UserId { get; set; }
        public string Action { get; set; } = string.Empty; // Create, Update, Delete
        public string EntityName { get; set; } = string.Empty;
        public string? OldValues { get; set; } // JSON
        public string? NewValues { get; set; } // JSON
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
}
