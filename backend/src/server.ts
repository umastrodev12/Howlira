import { createServer } from "http";
import express from "express";
import helmet from "helmet";

const server = express();
const httpServer = createServer(server);

server.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["wss:", "ws:"],
      },
    },
    crossOriginEmbedderPolicy: false,
  }),
);