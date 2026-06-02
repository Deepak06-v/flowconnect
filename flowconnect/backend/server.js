const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const { Server: SocketIO } = require("socket.io");
const initSocket = require("./socket/socket.js");
const notificationsRouter = require("./routes/notifications.js");
const analyticsRouter = require("./routes/analytics.js");

const app = express();
const server = http.createServer(app);

const socketCorsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim()).filter(Boolean)
  : [];

const io = new SocketIO(server, {
  // Replace the wildcard origin with an explicit allowlist from the environment.
  // origin: "*" allows any website to establish a Socket.IO connection, which
  // combined with cookie-based authentication enables CSRF attacks.
  cors: {
    origin: socketCorsOrigins.length > 0 ? socketCorsOrigins : false,
    credentials: true,
  },
});

initSocket(io);

mongoose.connect("YOUR_MONGO_URI");

app.use(express.json());
app.use("/api/notifications", notificationsRouter);
app.use("/api/dashboard", analyticsRouter);

server.listen(5000, () => console.log("Server running on port 5000"));