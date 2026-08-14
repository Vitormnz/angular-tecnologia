namespace EPR.src.ERP.Application.DTOs
{
    public record RegistroPontoDto(Guid FuncionarioId, double? Latitude, double? Longitude);
    public record RegistroPontoInputDto(double? Latitude, double? Longitude); //Evitar Fraude ao bater ponto, não enviar o FuncionarioId do celular, pois ele pode ser alterado. O FuncionarioId será extraído do Token JWT.
}
