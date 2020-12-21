import React, { Component} from "react";
import { Col, Row, Card, CardHeader, CardBody, CardFooter, Button } from "reactstrap";
import { Link } from "react-router-dom";

import Search from "../Search/Search";
import Info from "../Info/Info";
import BlocksRealtime from "../Blocks/BlocksRealtime";
import TransactionsRealtime from "../Transactions/TransactionsRealtime";
import BarChart from "../Chart/BarChart";
import PieChart from "../Chart/PieChart";
import agent from "../../agent";

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            transactions: null
        };
    }
    
    componentDidMount() {
        let self = this;
        setInterval(function() {
            self.getTransactions(10);
        }, 2000);
    };

    async getTransactions() {
        let transactions = await agent.Sawtooth.getAllTransactionsReal();
        this.setState({
            transactions: transactions.data
        });
    };

    render() {
        return (
            <div className="animated fadeIn">
                {/* Search */}
                <Row>
                    <Col sm="12" md={{ size: 8, offset: 2}}>
                        <Search />
                    </Col>
                </Row>

                {/* Infomation */}
                <Row>
                    <Col>
                        <Info />
                    </Col>
                </Row>

                {/* Chart */}
                <Row>
                    <Col style={{height: "250px"}}>
                        <PieChart transactions={this.state.transactions}/>
                    </Col>
                    <Col style={{height: "250px"}}>
                        <BarChart transactions={this.state.transactions}/>
                    </Col>
                </Row>


                {/* Table Blocks and Transaction */}
                <Row style={{ fontSize: "13px" }} xs="2">
                    <Col>
                        <Card style={{height: "680px"}}>
                            <CardHeader><strong>Realtime Blocks</strong></CardHeader>
                            <CardBody>
                                <BlocksRealtime />
                            </CardBody>
                            <CardFooter>
                                <Link to="/blocks">
                                    <Button outline block color="primary" size="lg">
                                        View all Blocks
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{height: "680px"}}>
                            <CardHeader><strong>Realtime Transactions</strong></CardHeader>
                            <CardBody>
                                <TransactionsRealtime />
                            </CardBody>
                            <CardFooter>
                                <Link to="/transactions">
                                    <Button outline block color="primary" size="lg">
                                        View all Transactions
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    </Col>
                    
                </Row>
            </div>
        );
    }
}

export default Dashboard;
