import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { loadConfig } from "./config.js";
import { HttpTools } from "./tools/http.js";
import { loadOpenApiSpec } from "./tools/openapi.js";
import "dotenv/config";

const config = loadConfig();
const http = new HttpTools(config);

const server = new Server(
  { name: "mcp-rest-api", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "http_get",
      description: "Hace un GET a un endpoint de la API configurada",
      inputSchema: {
        type: "object",
        properties: {
          path: { type: "string", description: "Path del endpoint, ej: /users/123" },
          params: { type: "object", description: "Query params opcionales", additionalProperties: { type: "string" } },
        },
        required: ["path"],
      },
    },
    {
      name: "http_post",
      description: "Hace un POST a un endpoint de la API configurada",
      inputSchema: {
        type: "object",
        properties: {
          path: { type: "string", description: "Path del endpoint" },
          body: { type: "object", description: "Body JSON a enviar" },
        },
        required: ["path", "body"],
      },
    },
    {
      name: "http_put",
      description: "Hace un PUT a un endpoint de la API configurada",
      inputSchema: {
        type: "object",
        properties: {
          path: { type: "string", description: "Path del endpoint" },
          body: { type: "object", description: "Body JSON a enviar" },
        },
        required: ["path", "body"],
      },
    },
    {
      name: "http_delete",
      description: "Hace un DELETE a un endpoint de la API configurada",
      inputSchema: {
        type: "object",
        properties: {
          path: { type: "string", description: "Path del endpoint" },
        },
        required: ["path"],
      },
    },
    {
      name: "load_api_spec",
      description: "Carga una spec OpenAPI/Swagger y devuelve los endpoints disponibles para que puedas usarlos",
      inputSchema: {
        type: "object",
        properties: {
          source: { type: "string", description: "Path local o URL a la spec OpenAPI en JSON" },
        },
        required: ["source"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === "http_get") {
      const result = await http.get(args.path as string, args.params as Record<string, string>);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    if (name === "http_post") {
      const result = await http.post(args.path as string, args.body);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    if (name === "http_put") {
      const result = await http.put(args.path as string, args.body);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    if (name === "http_delete") {
      const result = await http.delete(args.path as string);
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }

    if (name === "load_api_spec") {
      const endpoints = await loadOpenApiSpec(args.source as string);
      return { content: [{ type: "text", text: JSON.stringify(endpoints, null, 2) }] };
    }

    throw new Error(`Tool desconocida: ${name}`);

  } catch (err: any) {
    return {
      content: [{ type: "text", text: `Error: ${err.message}` }],
      isError: true,
    };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
