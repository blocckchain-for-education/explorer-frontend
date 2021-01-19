import React, { Component } from "react";
import agent from "../../agent";
import { Card, CardBody, Spinner, Table, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import nodes from "../../assets/nodes.svg";
import app from "../../assets/app.svg";
import cubes from "../../assets/cubes.svg";
import transaction from "../../assets/transaction.svg";

class Info extends Component {
    constructor(props) {
        super(props);

        this.state = {
            peers: null,
            transactions: null,
            blocks: null,
            txFamily: null
        };
    }

    loading = () =>
    (
        <Row>
            <Col sm="12" md={{ size: 6 }}>
                <Spinner
                    color="primary"
                    style={{ width: "25px", height: "25px" }}
                />
            </Col>
        </Row>
    );

    async getAllBlocks() {
        let blocks = await agent.Sawtooth.getAllBlocks();
        this.setState({
            blocks: blocks.data
        })
    }

    async getAllTransactions() {
        let transactions = await agent.Sawtooth.getAllTransactions();
        let trans_num = await agent.Sawtooth.getTransactionsNum();
        this.setState({
            transactions: transactions.data,
            transaction_num: trans_num.transaction_num,
        })
    }
    async getPeers() {
        let peers = await agent.Sawtooth.getPeers();
        this.setState({
            peers: peers.data
        })
    }

    async getTxFamily() {
        let txFamily = await agent.Sawtooth.getFamilies();
        this.setState({
            txFamily: txFamily.families
        })
        // this.setState({
        //     txFamily: { length: 2 }
        // })
    }

    componentDidMount() {
        let self = this;
        setInterval(() => {
            self.getPeers();
            self.getAllBlocks();
            self.getAllTransactions();
            self.getTxFamily();
        }, 2000)
    }

    render() {
        return <div>
            <Row>
                <Col xs="12" sm="6" lg="3">
                    <Card>
                        <CardBody className="pb-0">
                            <Table borderless size="sm">
                                <tbody>
                                    <tr>
                                        <td rowSpan="2">
                                            <img src={nodes} width="50px" alt="nodes" />
                                        </td>
                                        <td><h5 className="text-muted">Total nodes</h5></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            {this.state.peers ? (
                                                <h5 className="text-primary animated fadeIn">
                                                    {this.state.peers.length + 1 + " nodes"}
                                                </h5>
                                            ) : (
                                                    this.loading()
                                                )}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>

                <Col xs="12" sm="6" lg="3">
                    <Card>
                        <CardBody className="pb-0">
                            <Table borderless size="sm">
                                <tbody>
                                    <tr>
                                        <td rowSpan="2">
                                            <img src={transaction} width="50px" alt="transactions" />
                                        </td>
                                        <td><Link to="/transactions" className="text-muted"><h5>Total transactions</h5></Link></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            {this.state.transactions ? (
                                                <h5 className="text-primary animated fadeIn">
                                                    {this.state.transaction_num + " transactions"}
                                                </h5>
                                            ) : (
                                                    this.loading()
                                                )}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>

                <Col xs="12" sm="6" lg="3">
                    <Card>
                        <CardBody className="pb-0">
                            <Table borderless size="sm">
                                <tbody>
                                    <tr>
                                        <td rowSpan="2">
                                            <img src={cubes} width="50px" alt="blocks" />
                                        </td>
                                        <td><Link to="/blocks" className="text-muted"><h5>Total blocks</h5></Link></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            {this.state.blocks ? (
                                                <h5 className="text-primary animated fadeIn">
                                                    {parseInt(this.state.blocks[0].header.block_num) + 1 + " blocks"}
                                                </h5>
                                            ) : (
                                                    this.loading()
                                                )}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>

                <Col xs="12" sm="6" lg="3">
                    <Card>
                        <CardBody className="pb-0">
                            <Table borderless size="sm">
                                <tbody>
                                    <tr>
                                        <td rowSpan="2">
                                            <img src={app} width="50px" alt="transaction_family" />
                                        </td>
                                        <td><h5 className="text-muted">Total transactions family</h5></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            {this.state.txFamily ? (
                                                <h5 className="text-primary animated fadeIn">
                                                    {this.state.txFamily.length + " transaction family"}
                                                </h5>
                                            ) : (
                                                    this.loading()
                                                )}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </div>
    }
}

export default Info;