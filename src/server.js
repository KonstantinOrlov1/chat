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

  const data = {};

  ws.on("message", function (message) {
    const activeClient = ws.clientId;
    data.type = "messege";
    data.content = message.toString();

    for (let client of clients) {
      if (client.clientId !== activeClient) {
        client.send(JSON.stringify(data));
      }
    }
  });

  ws.on("close", function () {
    const activeClient = ws.clientId;
    clients.delete(activeClient);

    data.type = "clientLoggedOut";
    data.content = `Пользователь ${activeClient} вышел из чата`;

    for (let client of clients) {
      client.send(JSON.stringify(data));
    }
  });
}
