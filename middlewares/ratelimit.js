const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  headers: true,
  keyGenerator: (req) => req.ip,
  handler: (req, res, next) => {
    res.status(429).json({
      message: "Too many requests coming from this IP, please try again later!",
    });
  },
});

module.exports = limiter;
