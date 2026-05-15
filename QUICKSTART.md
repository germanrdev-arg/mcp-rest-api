# mcp-rest-api — Quickstart Guide

Get Claude talking to any REST API in under 10 minutes.

---

## What you need before starting

- Claude Desktop installed (download at claude.ai/download)
- Node.js 18 or higher (check with `node --version` in terminal)
- An API you want to connect (any REST API with a base URL and auth token)

---

## Step 1 — Install the server

Open your terminal and run:

```bash
cd mcp-rest-api
npm install
npm run build
```

You should see no errors. A `dist/` folder will be created.

---

## Step 2 — Find your Claude Desktop config file

**On Mac:**
```
/Users/YOUR_NAME/Library/Application Support/Claude/claude_desktop_config.json
```

**On Windows:**
```
C:\Users\YOUR_NAME\AppData\Roaming\Claude\claude_desktop_config.json
```

Open that file in any text editor (VS Code, TextEdit, Notepad).

---

## Step 3 — Add the MCP server

Paste this inside the file. If the file already has content, add `"mcpServers"` as a new key inside the existing `{}`:

```json
{
  "mcpServers": {
    "rest-api": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/mcp-rest-api/dist/index.js"],
      "env": {
        "API_BASE_URL": "https://your-api.com",
        "API_AUTH_TOKEN": "your-token-here",
        "API_AUTH_HEADER": "Authorization",
        "API_AUTH_PREFIX": "Bearer"
      }
    }
  }
}
```

Replace:
- `/ABSOLUTE/PATH/TO/mcp-rest-api` with the actual path to the folder on your machine
- `https://your-api.com` with your API's base URL
- `your-token-here` with your API token

**How to find the absolute path (Mac):**
Drag the `mcp-rest-api` folder into the terminal window — it will paste the full path automatically.

---

## Step 4 — Restart Claude Desktop

Quit Claude completely (Cmd+Q on Mac, not just close the window) and reopen it.

---

## Step 5 — Test it

In Claude Desktop, type:

> "Make a GET request to /users"

If Claude responds with data from your API, you're live.

---

## Using OpenAPI auto-discovery

If your API has an OpenAPI/Swagger spec, Claude can discover all endpoints automatically:

> "Load the API spec from https://your-api.com/openapi.json"

After loading, Claude knows every available endpoint without manual configuration.

---

## Auth configuration examples

**Bearer token (most common):**
```json
"API_AUTH_HEADER": "Authorization",
"API_AUTH_PREFIX": "Bearer"
```

**API Key header:**
```json
"API_AUTH_HEADER": "X-API-Key",
"API_AUTH_PREFIX": ""
```

**Basic auth:** use a pre-encoded base64 token and set prefix to `Basic`.

---

## Common issues

**"Tool not found" in Claude** → The server isn't running. Check that the path in the config is correct and that you ran `npm run build`.

**401 Unauthorized from your API** → Check your token and auth header name.

**Claude doesn't see any tools** → Make sure you fully quit and restarted Claude Desktop (Cmd+Q, not just close).

**JSON parse error in config file** → Your `claude_desktop_config.json` has a syntax error. Use jsonlint.com to validate it.

---

## Need help?

Email: germanr.dev@gmail.com
Response within 24 hours.

---

*mcp-rest-api — MIT License*
