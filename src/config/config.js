if (process.env.REACT_APP_NODE_ENV === "production") {
  module.exports = {
    ROOT_URL: "http://139.59.125.235:1998/http://139.59.125.235:2398",
    SAWTOOTH_NODE:"139.59.125.235:4004",
    ES_URL:"139.59.125.235:9200",
    devMode: true,
    websocket_url: "ws:139.59.125.235:8008/subscriptions",
  };
} else {
  module.exports = {
    ROOT_URL: "http://139.59.125.235:1998/http://139.59.125.235:2398",
    devMode: false,
    websocket_url: "ws:139.59.125.235:8008/subscriptions",
    ES_URL: "http://139.59.125.235:9200",
    APIKEY:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImRpbnRlIiwiZW1haWwiOiJkaW50ZUBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImFjdGl2ZSI6dHJ1ZSwiYmFsYW5jZSI6MCwicmVmZXJyYWxfY29kZSI6bnVsbCwicGxhbiI6eyJwbGFuX3R5cGUiOiJwcm8iLCJkdWVfZGF0ZSI6MH0sIm5hbWUiOiJkaW50ZSIsInBob25lIjoiMDEyMzQ1Njc4OSIsImJpcnRoZGF5IjoiMDEvMDEvMTk3MCIsInVzZXJfaWQiOiI1ZjY4N2YwYjAzZTcyOWE0OWRhYjE5NTciLCJleHAiOjE2MzQ2MzUyNTZ9.68eFaiIGZJ3eBt9UvI7mn0is9jtjwJ4kXyvJL5qsJxQ",
  };
}
