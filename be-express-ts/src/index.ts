import "dotenv/config";
import express, { type Application } from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/error-handler.js";

const app: Application = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    allowedHeaders: ["Content-Type", "Authorization", "Accept", "Origin", "X-Requested-With"],
  }),
);

app.use(express.json());

app.get("/health", (req, res) => {
  res.send("healthy");
});

app.use(cookieParser());
app.use(routes);
app.use(errorHandler);

const server = http.createServer(app);
server.timeout = 1000 * 60 * 1; // 1 minute

const port = Number(process.env?.PORT) || 4000;
const hostname = "0.0.0.0";
const backlog = 100;

server
  .listen(port, hostname, backlog, () => {
    console.log(`server running in ${port}`);
  })
  .on("error", (error) => {
    console.log("error server :", error?.message);
  });
