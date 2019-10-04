import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Badge, Table } from "reactstrap";
import agent from "../../agent";

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
      <td>{transaction.payload.substring(0, 100)}...</td>
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
  constructor(props) {
    super(props);
    this.state = {
      transactions: null
    };
  }
  componentDidMount() {
    this.getTransactions();
  }
  async getTransactions() {
    let transactions = await agent.Sawtooth.getAllTransactions();
    this.setState({
      transactions: transactions.data
    });
  }
  render() {
    let transactionsData = this.state.transactions;
    if (!transactionsData) {
      return "Loading...";
    }
    return (
      <div className="animated fadeIn">
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
