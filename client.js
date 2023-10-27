const axios = require('axios').default;
const { io } = require("socket.io-client");
const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

const target = "web-server";
const port = 8080;

const url = "http://" + target + ":" + port.toString();
const downloadUrl = url + "/download";
const registerUrl = url + "/register";

const socket = io(url);

let username;

function startSocketListener() {
  socket.on("connect", () => {
    console.log("Connected with id:", socket.id);

    rl.question("What is your name? ", async (input) => {
      username = input;
      console.log(`Welcome ${input}, enter your message below`);
      await registerUser();
    });
  });

  socket.on("disconnect", () => {
    console.log("Disconnected!");
  });

  socket.on("broadcast", (data) => {
    console.log(`${data.sender}: ${data.msg}`);
  });
}

async function downloadPublicKey() {
  try {
    const response = await axios.get(downloadUrl);
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
}

async function registerUser() {
  const postData = {
    username: username,
    publicKey: "client-public-key"
  };

  try {
    const response = await axios.post(registerUrl, postData);
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
}

async function main() {
  await downloadPublicKey();
  startSocketListener();

  // triggered on end-of-line input (\n, \r, or \r\n)
  rl.on("line", (input) => {
    socket.emit("broadcast", { "sender": username, "msg": input });
  });
}

main();