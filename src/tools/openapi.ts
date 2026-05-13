import { readFileSync } from "fs";
import axios from "axios";

export interface ParsedEndpoint {
  method: string;
  path: string;
  summary: string;
  parameters: Array<{ name: string; in: string; description?: string; required?: boolean }>;
}

export async function loadOpenApiSpec(source: string): Promise<ParsedEndpoint[]> {
  let raw: string;

  if (source.startsWith("http")) {
    const res = await axios.get(source);
    raw = JSON.stringify(res.data);
  } else {
    raw = readFileSync(source, "utf-8");
  }

  const spec = JSON.parse(raw);
  const endpoints: ParsedEndpoint[] = [];

  for (const [path, methods] of Object.entries(spec.paths || {})) {
    for (const [method, op] of Object.entries(methods as Record<string, any>)) {
      if (["get", "post", "put", "delete", "patch"].includes(method)) {
        endpoints.push({
          method: method.toUpperCase(),
          path,
          summary: op.summary || op.operationId || `${method} ${path}`,
          parameters: op.parameters || [],
        });
      }
    }
  }

  return endpoints;
}
