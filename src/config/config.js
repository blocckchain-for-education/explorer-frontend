if (process.env.REACT_APP_NODE_ENV !== "production") {
  module.exports = {
    ROOT_URL: "https://v-chain.vn/sawtooth/api",
    devMode: true,
    websocket_url:"ws:178.128.217.110:8008/subscriptions"
  };
  
} else {
  module.exports = {
    ROOT_URL: "https://v-chain.vn/sawtooth/api",
    devMode: true,
    websocket_url:"ws:178.128.217.110:8008/subscriptions"

  };
}
