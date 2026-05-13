# MCP REST API Server

Un servidor MCP (Model Context Protocol) que proporciona herramientas para hacer llamadas HTTP a cualquier API REST.

## Instalación

```bash
npm install
```

## Configuración

Crea un archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

Luego configura:
- `API_BASE_URL`: La URL base de la API a la que conectarse
- `API_AUTH_TOKEN`: (Opcional) Token Bearer para autenticación
- `API_KEY`: (Opcional) Header X-API-Key
- `API_TIMEOUT`: (Opcional) Timeout en ms, default 10000

## Desarrollo

```bash
npm run dev
```

## Build

```bash
npm run build
npm start
```

## Herramientas Disponibles

- `http_get`: Hace un GET a un endpoint
- `http_post`: Hace un POST a un endpoint
- `http_put`: Hace un PUT a un endpoint
- `http_delete`: Hace un DELETE a un endpoint
- `load_api_spec`: Carga una spec OpenAPI/Swagger desde URL o archivo local
