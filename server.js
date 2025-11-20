const http = require('http');
const WebSocket = require('ws');

// Crea un servidor HTTP básico
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Servidor Styceht Drift activo.");
});

// Crea el servidor WebSocket sobre el HTTP
const wss = new WebSocket.Server({ server });

let clients = [];

wss.on('connection', (ws) => {
  clients.push(ws);
  ws.on('message', (msg) => {
    clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  });
});

// Railway asigna el puerto automáticamente
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
