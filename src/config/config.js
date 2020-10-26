if (process.env.REACT_APP_NODE_ENV === "production") {
  module.exports = {
    ROOT_URL: "https://live.v-chain.vn/api",
    SAWTOOTH_NODE:"https://v-chain.vn/sawtooth/api",
    ES_URL:"https://elasticsearch.v-chain.vn",
    devMode: true,
    websocket_url:"ws:159.65.223.173:8090/subscriptions"
  };
  
} else {
  module.exports = {
    ROOT_URL: "http://139.59.192.86:8081/http://v-chain.vn/sawtooth/api",
    devMode: false,
    websocket_url:"wss:v-chain.vn/sawtooth/api/subscriptions",
    ES_URL:"http://139.59.217.172:9200",
    APIKEY: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImRpbnRlIiwiZW1haWwiOiJkaW50ZUBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImFjdGl2ZSI6dHJ1ZSwiYmFsYW5jZSI6MCwicmVmZXJyYWxfY29kZSI6bnVsbCwicGxhbiI6eyJwbGFuX3R5cGUiOiJwcm8iLCJkdWVfZGF0ZSI6MH0sIm5hbWUiOiJkaW50ZSIsInBob25lIjoiMDEyMzQ1Njc4OSIsImJpcnRoZGF5IjoiMDEvMDEvMTk3MCIsInVzZXJfaWQiOiI1ZjY4N2YwYjAzZTcyOWE0OWRhYjE5NTciLCJleHAiOjE2MzQ2MzUyNTZ9.68eFaiIGZJ3eBt9UvI7mn0is9jtjwJ4kXyvJL5qsJxQ"
  };
}
