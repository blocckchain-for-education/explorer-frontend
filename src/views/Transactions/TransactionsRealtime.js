import React, { Component} from "react";
import agent from "../../agent";
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Row, Table, Spinner } from "reactstrap";
import { Link } from "react-router-dom"


class TransactionRealtime extends Component {
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

    loading = () => 
        (
        <Row>
            <Col sm="12" md={{ size: 6}}>
            <Spinner
                color="primary"
                style={{ width: "100px", height: "100px" }}
            />
            </Col>
        </Row>
    );

    async getTransactions() {
        let transactions = await agent.Sawtooth.getTransactions(10);
        this.setState({
            transactions: transactions.data
        });
    };

    render() {
        if(!this.state.transactions) {
            return this.loading()
        }


        return <div className="animated fadeIn">
            <Table borderless>
                <tr>
                    <th>Transaction ID</th>
                    <th>Transaction Family</th>
                    <th>Version</th>
                    <th>Payload</th>
                </tr>

                {this.state.transactions.map((transaction) => {
                        return (
                            <tr>
                                <td><Link to={"/transactions/" + transaction['header_signature']}>{transaction['header_signature'].slice(0,15) + '...'}</Link></td>
                                <td>{transaction['header']['family_name']}</td>
                                <td>{transaction['header']['family_version']}</td>
                                <td>{transaction['payload'].slice(0,20) + '...'}</td>
                            </tr>
                        )
                    })
                }
            </Table>
        </div>
    }
}

export default TransactionRealtime;