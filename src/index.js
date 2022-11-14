/** This is the server you created in server.js.
 * If you decided to export a function that creates a server, you will have to modify this
 * */

const { setupExpressServer } = require("./server");

const server = setupExpressServer();
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Server listening on Port", PORT);
});
