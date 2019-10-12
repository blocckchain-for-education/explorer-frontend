import superagentPromise from "superagent-promise";
import _superagent from "superagent";
import config from "./config/config";
const superagent = superagentPromise(_superagent, global.Promise);

const ROOT_URL = config.ROOT_URL;
const SAWTOOTH_NODE = config.SAWTOOTH_NODE;

const responseBody = res => {
    return res.body;
};

const requests = {
  del: url => superagent.del(`${ROOT_URL}${url}`).then(responseBody),
  get: url => superagent.get(`${ROOT_URL}${url}`).then(responseBody),
  put: (url, body) =>
    superagent.put(`${ROOT_URL}${url}`, body).then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${ROOT_URL}${url}`, body)
      .set("authorization", sessionStorage.getItem("authorization"))
      .then(responseBody)
};
const requestsIP = {
  get: url => superagent.get(`${url}`).then(responseBody),
};
const requestsNetwork = {
  del: url => superagent.del(`${SAWTOOTH_NODE}${url}`).then(responseBody),
  get: url => superagent.get(`${SAWTOOTH_NODE}${url}`).then(responseBody)

};
const SawtoothNetwork = {
  getNodes: () => requestsNetwork.get("/peers"),
  nodeInfo:(url)=>requestsIP.get()
};

const Sawtooth = {
  getBlocks: limit => requests.get("/blocks?limit=" + limit),
  getBatches: limit => requests.get("/batches?limit=" + limit),
  getTransactions: limit => requests.get("/transactions?limit=" + limit),
  getAllTransactions: limit => requests.get("/transactions?limit=1000000"),
  getTransaction: id => requests.get("/transactions/"+id),
  getBlock: id => requests.get("/blocks/"+id),
  getBatch: id => requests.get("/batches/"+id)

};

export default {
  Sawtooth,
  SawtoothNetwork
};
