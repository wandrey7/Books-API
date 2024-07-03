var rfs = require("rotating-file-stream");
const path = require("path");

var accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // Set the interval
  path: path.join(__dirname, "/"),
});

module.exports = accessLogStream;
