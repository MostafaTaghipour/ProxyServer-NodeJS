const express = require("express");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");

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
app.use("", (req, res, next) => {
  if (req.headers.authorization === "mostafa") {
    next();
  } else {
    res.sendStatus(403);
  }
});

// Proxy endpoints
app.use(
  "/json_placeholder",
  createProxyMiddleware({
    target: "https://jsonplaceholder.typicode.com",
    changeOrigin: true,
    pathRewrite: {
      [`^/json_placeholder`]: "",
    },
  })
);

app.use(
  "/onesignal",
  createProxyMiddleware({
    target: "https://onesignal.com/",
    changeOrigin: true,
    pathRewrite: {
      [`^/onesignal`]: "",
    },
  })
);

app.use(
  "/onesignal_api",
  createProxyMiddleware({
    target: "https://api.onesignal.com",
    changeOrigin: true,
    pathRewrite: {
      [`^/onesignal_api`]: "",
    },
  })
);

// Start the Proxy
app.listen(port, () => {
  console.log(`Starting Proxy at http://localhost:${port}`);
});
