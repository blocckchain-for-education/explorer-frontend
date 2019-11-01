if (process.env.REACT_APP_NODE_ENV !== "production") {
  module.exports = {
    ROOT_URL: "http://178.128.217.110:8090",
    SAWTOOTH_NODE:"https://v-chain.vn/sawtooth/api",
    // ES_URL:"http://68.183.47.2:9200/node_info/_search",
    devMode: true,
    websocket_url:"ws:159.65.223.173:8090/subscriptions"
  };
  
} else {
  module.exports = {
    ROOT_URL: "https://v-chain.vn/sawtooth/api",
    devMode: true,
    websocket_url:"wss:178.128.217.110:8008/subscriptions",
    // ES_URL:"http://178.128.217.254:9200/node_info/_search"
  };
}
