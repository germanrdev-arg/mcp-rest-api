import { spawn } from 'child_process';
import { createReadStream } from 'fs';

const server = spawn('npx', ['tsx', 'src/index.ts'], {
  cwd: process.cwd(),
  stdio: ['pipe', 'pipe', 'inherit'],
});

let buffer = '';
let requestId = 1;

server.stdout.on('data', (data) => {
  buffer += data.toString();
  const lines = buffer.split('\n');
  buffer = lines.pop() || '';

  for (const line of lines) {
    if (line.trim()) {
      const response = JSON.parse(line);
      console.log('Response:', JSON.stringify(response, null, 2));
      process.exit(0);
    }
  }
});

// Esperar un momento para que el servidor se inicie
setTimeout(() => {
  const request = {
    jsonrpc: '2.0',
    id: requestId++,
    method: 'tools/call',
    params: {
      name: 'http_get',
      arguments: {
        path: '/users/octocat'
      }
    }
  };

  console.log('Sending request:', JSON.stringify(request, null, 2));
  server.stdin.write(JSON.stringify(request) + '\n');
}, 500);

setTimeout(() => {
  server.kill();
  process.exit(1);
}, 5000);
