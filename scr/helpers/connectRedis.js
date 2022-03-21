import Redis from "ioredis";

const client = new Redis();

client.on("connect", function () {
  console.log("Connectd!");
});

//client.quit();
export default client;
