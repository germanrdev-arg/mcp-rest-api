import { ApiConfig } from "./types.js";

export function loadConfig(): ApiConfig {
  const baseUrl = process.env.API_BASE_URL;
  if (!baseUrl) throw new Error("API_BASE_URL es requerido en .env");

  const headers: Record<string, string> = {};

  if (process.env.API_AUTH_TOKEN)
    headers["Authorization"] = `Bearer ${process.env.API_AUTH_TOKEN}`;

  if (process.env.API_KEY)
    headers["X-API-Key"] = process.env.API_KEY;

  return {
    baseUrl: baseUrl.replace(/\/$/, ""),
    headers,
    timeout: parseInt(process.env.API_TIMEOUT || "10000"),
  };
}
