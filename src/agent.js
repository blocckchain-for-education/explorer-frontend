import superagentPromise from "superagent-promise";
import _superagent from "superagent";
import config from "./config/config";
import { element } from "prop-types";
const superagent = superagentPromise(_superagent, global.Promise);

const ROOT_URL = config.ROOT_URL;
const ES_URL = config.ES_URL;
const APIKEY = config.APIKEY;


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


// const requestsIP = {
//   get: url => superagent.get(`${url}`).then(responseBody),
// };

const requestES = {
  get: url => superagent.get(`${ES_URL}${url}`).then(responseBody)

};
const ES = {
  getAllDocs: () => requestES.get("/_stats"),
}

const Sawtooth = {
  getBlock: id => requests.get("/blocks/" + id),
  getBlocks: limit => requests.get("/blocks?limit=" + limit),
  getAllBlocks: limit => requests.get("/blocks"),
  getAllBlocksReal: async (limit) => requests.get("/blocks"),
  getBlocksNum : ()=>requests.get("/blocksNum"),

  getTransaction: id => requests.get("/transactions/" + id),
  getTransactions: limit => requests.get("/transactions?limit=" + limit),
  getAllTransactions: limit => requests.get("/transactions"),
  getAllTransactionsReal: async (limit) => {

    let transactions = {}
    transactions.data = []

    let blocks = await requests.get("/blocks")
    for (let element of blocks.data) {
      let batches = element['batches']
      for (let batch of batches) {
        transactions.data = transactions.data.concat(batch.transactions)
      }
    }
    
    let previous_block_id = blocks.data[blocks.data.length - 1].header.previous_block_id
    let genesis_block_id = "0000000000000000"
    while (previous_block_id != genesis_block_id) {
      let blocks = await requests.get("/blocks?head=" + previous_block_id)
      for (let element of blocks.data) {
        let batches = element['batches']
        for (let batch of batches) {
          transactions.data = transactions.data.concat(batch.transactions)
        }
      }
      previous_block_id = blocks.data[blocks.data.length - 1].header.previous_block_id
    }
   
    return transactions
  },
  getTransactionsNum: ()=>requests.get("/transactionsNum"),
  getPeers: limit => requests.get("/peers"),
  getFamilies : ()=> requests.get("/families")
};

const requestApp = {
  get: url => superagent
    .get(url)
    .set("Authorization", APIKEY)
    .then(responseBody)
}

const AppInfo = {
  getInfo: url => requestApp.get("https://v-chain.vn/appservice/v1/apps")
}



export default {
  Sawtooth,
  ES,
  AppInfo
};
