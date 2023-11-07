const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});
const { getSocket, downloadPublicKey, registerUser } = require("./client-util");
const socket = getSocket();

let username, privateKey, publicKey;

//--------------- Socket Event Start ---------------//

socket.on("connect", async () => {
  console.log("Connected with id:", socket.id);

  username = "alice";
  publicKey = "alice-public-key";

  console.log("Hello", username);
  await registerUser(username, publicKey);

  // we assume that Alice want to communicate with Bob
  const bobData = await downloadPublicKey("bob");
  console.log(bobData);
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
  const data = {
    "sender": username,
    "msg": input
  };
  socket.emit("chat", data);
});

// triggered on CTRL+C like command
rl.on('SIGINT', () => {
  process.exit(0);
});