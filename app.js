import express from "express";
import bodyParser from "body-parser";
import routers from "./scr/routers/index";
import cors from "cors";
import "dotenv/config";
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", routers);

app.listen(3000, function () {
  console.log("Node server running @ http://localhost:3000");
});

export default app;
