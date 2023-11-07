const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});
const { getSocket, downloadPublicKey, registerUser } = require("./client-util");
const socket = getSocket();

let username;
let aliceData, bobData;

//--------------- Socket Event Start ---------------//

socket.on("connect", async () => {
  console.log("Connected with id:", socket.id);

  username = "trudy";
  console.log("Hello", username);

  // Trudy does not need to register
  // Trudy just want to mess around

  aliceData = await downloadPublicKey("alice");
  bobData = await downloadPublicKey("bob");
});

socket.on("disconnect", () => {
  console.log("Disconnected!");
  process.exit(0);
});

socket.on("chat", (data) => {
  console.log(`${data.sender}: ${data.msg}`);
});

//--------------- Socket Event End ---------------//

// triggered on end-of-line input (\n, \r, or \r\n)
rl.on("line", (input) => {
  // We assume that Trudy wants to imitate Alice
  const data = {
    "sender": aliceData.username,
    "msg": input
  };

  // We assume that Trudy wants to imitate Bob
  // const data = {
  //   "sender": bobData.username,
  //   "msg": input
  // };

  socket.emit("chat", data);
});

// triggered on CTRL+C like command
rl.on('SIGINT', () => {
  process.exit(0);
});