# MCP REST API Server

Connect Claude to any REST API in minutes. No code changes to your existing API required.

## What this does

This MCP server lets Claude (via Cursor, Claude Desktop, or Claude Code) interact with any REST API using natural language. Instead of writing API calls manually, you just tell Claude what you need.

**Examples of what you can ask Claude once connected:**

- *"Get all orders from the last 7 days and show me the ones with status pending"*
- *"Create a new user with these details and confirm it was saved"*
- *"Check the inventory levels for these 5 products"*
- *"Update the price of product ID 482 to $29.99"*

## Demo

> Claude calling a real API endpoint through the MCP server — live response in under 2 seconds.

<img width="800" height="661" alt="Grabaciondepantalla2026-05-13alas15 58 39-ezgif com-video-to-gif-converter" src="https://github.com/user-attachments/assets/7fe152e8-28b8-40e7-9f46-a0a33d208b7d" />

## Setup

### 1. Clone and install

```bash
git clone https://github.com/yourusername/mcp-rest-api
cd mcp-rest-api
npm install
```

### 2. Configure your API

Create a `.env` file:

```env
API_BASE_URL=https://your-api.com
API_AUTH_TOKEN=your_token_here
API_TIMEOUT=10000
```

Supports three auth methods out of the box:
- Bearer token (`API_AUTH_TOKEN`)
- API key header (`API_KEY`)
- No auth (public APIs)

### 3. Connect to Cursor or Claude Desktop

**Cursor** — Settings → MCP → Add server:

```json
{
  "mcpServers": {
    "rest-api": {
      "command": "npx",
      "args": ["tsx", "/path/to/mcp-rest-api/src/index.ts"],
      "env": {
        "API_BASE_URL": "https://your-api.com",
        "API_AUTH_TOKEN": "your_token"
      }
    }
  }
}
```

**Claude Desktop** — edit `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "rest-api": {
      "command": "npx",
      "args": ["tsx", "/path/to/mcp-rest-api/src/index.ts"],
      "env": {
        "API_BASE_URL": "https://your-api.com",
        "API_AUTH_TOKEN": "your_token"
      }
    }
  }
}
```

### 4. Test it

Ask Claude: *"Using the rest-api MCP, do a GET to /users/1 and show me the response"*

## Available tools

| Tool | What it does |
|------|-------------|
| `http_get` | GET request to any endpoint with optional query params |
| `http_post` | POST request with JSON body |
| `http_put` | PUT request with JSON body |
| `http_delete` | DELETE request to any endpoint |
| `load_api_spec` | Load an OpenAPI/Swagger spec and discover all available endpoints automatically |

### OpenAPI support

If your API has a Swagger/OpenAPI spec, point Claude to it and it will automatically know all your endpoints:

```
"Load the API spec from https://your-api.com/openapi.json and then get all available users"
```

Claude will read the spec, understand your API structure, and start making calls — no manual configuration needed.

## Works with any REST API

Tested with: GitHub API · Stripe · Shopify Admin API · HubSpot · custom internal APIs

## Custom integration

Need this configured for your specific API, with custom auth, error handling, or additional tools? [Get in touch →](mailto:germanr.dev@gmail.com)
