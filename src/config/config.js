if (process.env.REACT_APP_NODE_ENV !== "production") {
  module.exports = {
    ROOT_URL: "https://live.v-chain.vn/api",
    SAWTOOTH_NODE:"https://v-chain.vn/sawtooth/api",
    ES_URL:"https://elasticsearch.v-chain.vn",
    devMode: true,
    websocket_url:"ws:159.65.223.173:8090/subscriptions"
  };
  
} else {
  module.exports = {
    ROOT_URL: "https://live.v-chain.vn/api",
    devMode: false,
    websocket_url:"wss:178.128.217.110:8008/subscriptions",
    ES_URL:"https://elasticsearch.v-chain.vn"
  };
}
