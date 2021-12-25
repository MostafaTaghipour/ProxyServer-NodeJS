const express = require("express");
const router = express.Router();
const { createProxyMiddleware } = require("http-proxy-middleware");

// Authorization
router.use("", (req, res, next) => {
  if (req.headers.authorization === "mostafa") {
    next();
  } else {
    res.sendStatus(403);
  }
});

// Proxy endpoints
router.use(
  "/json_placeholder",
  createProxyMiddleware({
    target: "https://jsonplaceholder.typicode.com",
    changeOrigin: true,
    pathRewrite: {
      [`^/proxies/json_placeholder`]: "",
    },
  })
);

router.use(
  "/onesignal",
  createProxyMiddleware({
    target: "https://onesignal.com/",
    changeOrigin: true,
    pathRewrite: {
      [`^/proxies/onesignal`]: "",
    },
  })
);

router.use(
  "/onesignal_api",
  createProxyMiddleware({
    target: "https://api.onesignal.com",
    changeOrigin: true,
    pathRewrite: {
      [`^/proxies/onesignal_api`]: "",
    },
  })
);

module.exports = router;
