if (process.env.REACT_APP_NODE_ENV !== "production") {
  module.exports = {
    ROOT_URL: "https://v-chain.vn/sawtooth/api_docker",
    SAWTOOTH_NODE:"https://v-chain.vn/sawtooth/api",
    ES_URL:"https://v-chain.vn/elasticsearch",
    devMode: true,
    websocket_url:"ws:159.65.223.173:8090/subscriptions"
  };
  
} else {
  module.exports = {
    ROOT_URL: "https://v-chain.vn/sawtooth/api_docker",
    devMode: true,
    websocket_url:"wss:178.128.217.110:8008/subscriptions",
    ES_URL:"https://v-chain.vn/elasticsearch"
  };
}
