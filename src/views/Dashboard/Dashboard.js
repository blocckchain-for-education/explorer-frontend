import React, { Component, useState } from "react";
import agent from "../../agent";
import { Link, Redirect } from "react-router-dom";
import {
  ButtonGroup,
  Card, CardBody, CardHeader, CardTitle,
  Col, Row,
  Progress,
  Table,
  Spinner,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  Input,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

// import Search from "../Search/Search";
import Transactions from "../Transactions/Transactions";
import Blocks from "../Blocks/Blocks";
// import Batches from "../Batches/Batches";

import TransactionFamily from "../Transactions/TransactionFamily";
import TPS24h from "../Transactions/TPS24h";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.search =  this.search.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropDownValue: 'Select',
      dropdownOpen: false,
      id: '',
      radioSelected: 2,
      blocks: null,
      transactions: null,
      transactions_all: null,
      // batches: null,
      peers: null,
      MAINNET:true,
      indices:null,
      redirect: false
    };
  }

  redirect() {
    this.setState({
      redirect: true
    })
  }

  search(e) {
    switch(this.state.dropDownValue) {
      case('block'):
        this.getBlock(this.state.id);
        break;
      case('transaction'):
        this.getTransaction(this.state.id);
        return <Redirect to='/transactions/:this.state.id' />;
        break;
      default:
        break;
    }
  }

  toggle(event) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  changeValue(e) {
    this.setState({
      dropDownValue: e.target.value
    })
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected
    });
  }

  onMessage = data => {
    // console.log(data);
    this.getBlocks(10);
    this.getTransactions(10);
    this.getAllTransactions();
    this.getPeers();
    // this.getBatches(10);
    // this.getNodes();
  };

  handleOpen = () => {
    this.sendMessage('{"action":"subscribe"}');
  };
  loading = () => 
    (
      <Row style={{ textAlign: "center" }}>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Spinner
            color="primary"
            style={{ width: "50px", height: "50px" }}
          />
        </Col>
      </Row>
    );

  sendMessage = message => {
    this.refWebSocket.sendMessage(message);
  };
  componentDidMount() {
    let self = this;
    setInterval(function() {
      self.getBlocks(10);
      self.getTransactions(10);
      self.getAllTransactions();
      // self.getBatches(10);
      self.countDocuments();
      self.getPeers();
    }, 2000);
  }

  async getBlocks(limit) {
    let blocks = await agent.Sawtooth.getBlocks(limit);
    if (blocks) {
      this.setState({
        blocks: blocks.data
      });
    }
  }
  async getTransactions(limit) {
    let transactions = await agent.Sawtooth.getTransactions(limit);
    this.setState({
      transactions: transactions.data
    });
  }

  async getBlock(id) {
    let block = await agent.Sawtooth.getBlock(id);
    if (block) {
      //TODO: Redirect neu ton tai block
          return <Redirect to={{
            pathname: '/blocks',
            state: { id: id }
          }} />
    }
  }

  async getTransaction(id) {
    let transaction = await agent.Sawtooth.getTransaction(id);
    if (transaction) {
      //TODO: Redirect neu ton tai transaction
      return `<Redirect to="/transactions/${id}" />`;
    }
  }
 
  async countDocuments() {
    let countDocs = await agent.ES.getAllDocs();
    
    // console.log(countDocs);
    this.setState({
      countDocs: countDocs._all.total.docs.count,
      indices:countDocs.indices
    });
  }
  async getAllTransactions() {
    let transactions = await agent.Sawtooth.getAllTransactions();
    this.setState({
      transactions_all: transactions.data
    });
  }
  
  // async getBatches(limit) {
  //   let batches = await agent.Sawtooth.getBatches(limit);
  //   this.setState({
  //     batches: batches.data
  //   });
  // }

  async getPeers() {
    let peers = await agent.Sawtooth.getPeers();
    this.setState({
      peers: peers.data
    });
  }

  render() {
    let nodes = this.state.nodes;
    return (
      <div className="animated fadeIn">
        {/* <Websocket url={config.websocket_url}
               onOpen={this.handleOpen} 
              onMessage={this.onMessage}
              ref={Websocket => {
                this.refWebSocket = Websocket;
              }}/> */}
        {/* <Row style={{paddingBottom:10}}>
          <Dropdown
            isOpen={this.state.networkDropdown}
            toggle={this.chooseNetwork}
          >
            <DropdownToggle caret>Choose Network</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={this.changeNetwork}>TESTNET</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={this.changeNetwork}>MAINNET</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Row> */}
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right"></ButtonGroup>
                <div>
                  Total nodes:{" "}
                  {/* {this.state.transactions ? (
                    <span className="text-value">
                      {this.state.peers.peers.length}
                    </span>
                  ) : (
                    <span className="text-value">Loading</span>
                  )} */}
                </div>
              </CardBody>
              <div
                className="chart-wrapper mx-3"
                style={{ height: "60px", paddingTop: "10px" }}
              >
                <Progress value={(12 / 1024) * 100} />
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right"></ButtonGroup>
                <div>
                  Total transactions: {" "}
                  {this.state.transactions ? (
                    <span className="text-value">
                      {this.state.transactions.length}
                    </span>
                  ) : (
                    <span className="text-value">Loading</span>
                  )}
                </div>
              </CardBody>
              <div
                className="chart-wrapper mx-3"
                style={{ height: "60px", paddingTop: "10px" }}
              >
                <Progress color="warning" value={(100 / 123) * 100} />
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-warning">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right"></ButtonGroup>
                <div>
                  Total blocks:{" "}
                  {this.state.blocks ? (
                    <span className="text-value">
                      {this.state.blocks[0].header.block_num}
                    </span>
                  ) : (
                    <span className="text-value">Loading</span>
                  )}
                </div>
              </CardBody>
              <div
                className="chart-wrapper mx-3"
                style={{ height: "60px", paddingTop: "10px" }}
              >
                <Progress value={(12 / 1024) * 100} />
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-danger">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right"></ButtonGroup>
                <div>
                  Total transactions family: {"  "}
                  {this.state.countDocs ? (
                    <span className="text-value">
                      {this.state.countDocs}
                    </span>
                  ) : (
                    <span className="text-value">Loading</span>
                  )}
                </div>
              </CardBody>
              <div
                className="chart-wrapper mx-3"
                style={{ height: "60px", paddingTop: "10px" }}
              >
                <Progress value={(12 / 1024) * 100} />
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
              <InputGroup>
                <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                  {this.state.dropDownValue}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem value="block" onClick={this.changeValue}>Block ID</DropdownItem>
                  <DropdownItem value="transaction" onClick={this.changeValue}>Transaction ID</DropdownItem>
                </DropdownMenu>
                </InputGroupButtonDropdown>
                <Input placeholder="ID..." name="id" type="text" onChange={(e) => this.state.id=e.target.value}/>
                <InputGroupAddon addonType="append"><Button color="primary" onClick={this.search}>Search</Button></InputGroupAddon>
              </InputGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col xs="12" sm="6" lg="6">
                    <CardTitle className="mb-0">
                      Transactions family (1000 txs){" "}
                    </CardTitle>
                    {/* <div className="small text-muted">October 2 2019</div> */}
                  </Col>
                </Row>
                <Row>
                  {/* <Col xs="12" sm="6" lg="6">
                    <TPS24h indices={this.state.indices}></TPS24h>
                  </Col> */}
                  <Col xs="12" sm="6" lg="6">
                    <TransactionFamily
                      transactions={this.state.transactions_all}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row style={{ fontSize: "11px" }}>
          <Col>
            <Card>
              <CardHeader>Transactions {" & "} Blocks</CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" md="6" xl="6">
                    <div className="callout callout-info">
                      {/* <small className="text-muted"> */}

                      <Link to="/transactions/"> Realtime transactions</Link>
                      {/* </small> */}
                      <br />
                      {/* {this.state.transactions?(<strong className="h4">{this.state.transactions[0].header.block_num}</strong>):<strong className="h4">loading</strong>} */}
                    </div>
                  </Col>
                </Row>
                <div className="progress-group mb-4"></div>
                <ul>
                  <Transactions transactions={this.state.transactions} />
                </ul>
                {/* <Row>
                  <Col xs="12" md="6" xl="6">
                    <div className="callout callout-info">
                      <small className="text-muted">
                      Realtime batches
                      </small>
                      <br />
                    </div>
                  </Col>
                </Row>
                <div className="progress-group mb-4"></div>
                <ul>
                  <Batches batches={this.state.batches} />
                </ul> */}
                <Row>
                  <Col xs="12" md="6" xl="6">
                    <div className="callout callout-warning">
                      Realtime block
                      <br />
                      Head blocks:{" "}
                      {this.state.blocks ? (
                        <strong className="h4">
                          {this.state.blocks[0].header.block_num}
                        </strong>
                      ) : (
                        <strong className="h4">loading</strong>
                      )}
                    </div>
                  </Col>
                </Row>
                <ul>
                  <Blocks blocks={this.state.blocks} />
                </ul>
                <br />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
