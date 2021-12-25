const express = require("express");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
const proxies = require("./proxies");

// Create Express Server
const app = express();

// Configuration
const port = process.env.PORT || 3000;
const HOST = "localhost";

// Logging
app.use(morgan("dev"));

// Info GET endpoint
app.get("/info", (req, res, next) => {
  res.send(
    "This is a proxy service which proxies to jsonplaceholder and onesignal APIs."
  );
});

// Authorization
app.use("/proxies", proxies);

// Start the Proxy
app.listen(port, () => {
  console.log(`Starting Proxy at http://localhost:${port}`);
});
