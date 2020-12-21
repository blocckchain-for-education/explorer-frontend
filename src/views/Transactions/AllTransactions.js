import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Table, Row, Col, Spinner, CardBody, CardHeader } from "reactstrap";
import agent from "../../agent";

function TransactionRow(props) {
  const transaction = props.transaction;
  const txLink = `/transactions/${transaction.header_signature}`;

  return (
    <tr key={transaction.header_signature.toString()}>
      <th scope="row">
        <Link to={txLink}>
          {transaction.header_signature.substring(0, 15)}...
        </Link>
      </th>
      <td>
        <Link to={txLink}>{transaction.header.family_name}</Link>
      </td>
      <td>{transaction.header.family_version}</td>
      <td>{transaction.header.signer_public_key.substring(0, 15)}...</td>
      <td>{transaction.payload.substring(0, 75)}...</td>
    </tr>
  );
}



class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: null,
    };
  }
  componentDidMount() {
    this.getAllTransactions();
  }
  async getAllTransactions() {
    let transactions = await agent.Sawtooth.getAllTransactionsReal();
    this.setState({
      transactions: transactions.data
    });
  }
  render() {
    let transactionsData = this.state.transactions;
    if (!transactionsData) {
      return (
        <Row style={{ textAlign: "center" }}>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Spinner
              color="primary"
              style={{ width: "50px", height: "50px" }}
            />
          </Col>
        </Row>
      );
    }

    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            All Transactions
          </CardHeader>
          <CardBody>
            <Table responsive hover>
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">App</th>
                  <th scope="col">App version</th>
                  <th scope="col">Signer Public Key</th>
                  <th scope="col">Payload</th>
                </tr>
              </thead>
              <tbody>
                {transactionsData.map((transaction, index) => (
                  <TransactionRow key={index} transaction={transaction} />
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card> 
      </div>
    );
  }
}

export default Transactions;
