const http = require('http');
const WebSocket = require('ws');

// Servidor HTTP básico para evitar "Upgrade Required"
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Servidor Styceht Drift activo.");
});

// WebSocket sobre HTTP
const wss = new WebSocket.Server({ server });

let clients = [];

wss.on('connection', (ws) => {
  clients.push(ws);
  ws.on('message', (msg) => {
    // Reenviar a todos los demás clientes
    clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  });

  ws.on('close', () => {
    clients = clients.filter(c => c !== ws);
  });
});

// Puerto asignado por Railway
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Servidor Styceht Drift activo en puerto ${PORT}`);
});
