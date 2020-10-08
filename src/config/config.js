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
    ROOT_URL: "http://0.0.0.0:8008",
    devMode: false,
    websocket_url:"wss:0.0.0.0:8008/subscriptions",
    ES_URL:"http://139.59.217.172:9200"
  };
}
