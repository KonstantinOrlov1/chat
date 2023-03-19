const ws = new require("ws");
const wss = new ws.Server({ port: 3001 });

const clients = new Set();

wss.on("connection", function (ws) {
  onSocketConnect(ws);
});

function onSocketConnect(ws) {
  const date = new Date();

  if (!ws.clientId) {
    ws.clientId = date.getTime();
  }

  clients.add(ws);

  ws.on("message", function (message) {
    console.log(`получено сообщение: ${message}`);
    const activeClient = ws.clientId;

    for (let client of clients) {
      if (client.clientId !== activeClient) {
        client.send(message, { binary: false });
      }
    }
  });

  ws.on("close", function () {
    console.log(`подключение закрыто`);
    const activeClient = ws.clientId;
    clients.delete(ws);

    for (let client of clients) {
      client.send(`Пользователь ${activeClient} вышел из чата`, {
        binary: false,
      });
    }
  });
}
