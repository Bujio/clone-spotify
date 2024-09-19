
const http = require("http");
const app = require("./server/index");
const config = require("./server/config/index");

const { port, hostname } = config.server;

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`🚀 Server running at http://${hostname}:${port}/`);
});
