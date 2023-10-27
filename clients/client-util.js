/**
 * This utility handles communication method with
 * the server through both REST API and web socket
 */

const axios = require('axios').default;
const { io } = require("socket.io-client");

const domain = "localhost";
const port = 8080;

const url = "http://" + domain + ":" + port.toString();
const downloadUrl = url + "/download";
const registerUrl = url + "/register";

function getSocket() {
  return io(url);
}

async function downloadPublicKey(username) {
  try {
    const url = downloadUrl + "/" + username;
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

async function registerUser(username, publicKey) {
  const postData = {
    username: username,
    publicKey: publicKey
  };
  try {
    await axios.post(registerUrl, postData);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getSocket,
  downloadPublicKey,
  registerUser
}