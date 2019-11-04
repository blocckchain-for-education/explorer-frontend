import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Badge, Table,Spinner,Row,Col } from "reactstrap";

function TransactionRow(props) {
  const transaction = props.transaction;
  const txLink = `/transactions/${transaction.header_signature}`;

  const getBadge = status => {
    return status === "Active"
      ? "success"
      : status === "Inactive"
      ? "secondary"
      : status === "Pending"
      ? "warning"
      : status === "Banned"
      ? "danger"
      : "primary";
  };

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
      <td>{window.atob(transaction.payload.substring(0, 100))}...</td>
      <td>
        <Link to={txLink}>
          <Badge color={getBadge(transaction.status)}>
            {transaction.status}
          </Badge>
        </Link>
      </td>
    </tr>
  );
}

class Transactions extends Component {
  render() {
    let transactionsData = this.props.transactions;
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
      <div className="animated fadeIn" style={{"fontSize":"11px"}}>
        <Table responsive hover>
          <thead>
            <tr>
              <th scope="col">id</th>
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
      </div>
    );
  }
}

export default Transactions;
