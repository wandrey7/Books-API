const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const limiter = require("./middlewares/ratelimit");
const handleJsonError = require("./middlewares/handleError");
const accessLogStream = require("./config/log/logs");
const BookRoutes = require("./Routes/BookRoutes");

const app = express();

app.use(express.json({ limit: "50kb" }));
app.use(helmet());
app.use(morgan("combined", { stream: accessLogStream }));

process.env.NODE_ENV === "production" ? app.use(limiter) : null;
app.use(handleJsonError);

app.get("/", (req, res) => {
  res.status(200).json({ message: "online" });
});

app.use("/api", BookRoutes);

module.exports = app;
