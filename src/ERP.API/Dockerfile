# BUILD DO FRONTEND (React)

FROM node:24-alpine AS frontend-build

WORKDIR /frontend

COPY frontend/package*.json ./

RUN npm ci

COPY frontend/ .

RUN npm run build


# BUILD DO BACKEND (.NET)

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS backend-build

WORKDIR /src

# Copia apenas o projeto para aproveitar o cache
COPY src/ERP.API/*.csproj ERP.API/

RUN dotnet restore ERP.API/ERP.API.csproj

# Copia o restante da aplicação
COPY src/ERP.API/ ERP.API/

# Copia o build do React
COPY --from=frontend-build /frontend/dist ./ERP.API/wwwroot

# Publica a aplicação
RUN dotnet publish src/ERP.API/ERP.API.csproj \
    -c Release \
    -o /app/publish \
    --no-restore


# IMAGEM FINAL
FROM mcr.microsoft.com/dotnet/aspnet:10.0

WORKDIR /app

COPY --from=backend-build /app/publish .

EXPOSE 8080

ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "ERP.API.dll"]