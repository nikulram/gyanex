const path = require("path");

module.exports = {
  resolve: {
    fallback: {
      "fs": false,
      "path": require.resolve("path-browserify"),
      "tls": false,
      "util": require.resolve("util/"),
      "net": false,
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "url": require.resolve("url/"),
      "assert": require.resolve("assert/"),
      "os": require.resolve("os-browserify/browser"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "buffer": require.resolve("buffer/"),
      "child_process": false, 
      "readline": false
    }
  }
};
