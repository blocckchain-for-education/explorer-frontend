import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Table } from "reactstrap";
function BlockRow(props) {
  const batch = props.batch;
  const txLink = `/blocks/${batch.header_signature}`;

  return (
    <tr key={batch.header_signature.toString()}>
      <th scope="row">
        <Link to={txLink}>{batch.header_signature.substring(0, 15)}...</Link>
      </th>
     
      <td>{batch.header.signer_public_key.substring(0, 47)}...</td>
      <td>
        <ul>
          {batch.header.transaction_ids.map(transaction_id=>{
            return(
              <li><Link to={`/transactions/${transaction_id}`} >{transaction_id.substring(0,100)}...</Link></li>
            )
          })}
        </ul>
      </td>

    </tr>
  );
}

class Batches extends Component {
  componentDidMount() {
  }
  render() {
    let batchesData = this.props.batches;
    console.log(batchesData)
    if(!batchesData){
        return "Loading..."
    }
    return (
      <div className="animated fadeIn">
        <Row>
          <Table responsive hover>
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Signer Public Key</th>
                <th scope="col">Transactions</th>
              </tr>
            </thead>
            <tbody>
              {batchesData.map((batch, index) => (
                <BlockRow key={index} batch={batch} />
              ))}
            </tbody>
          </Table>
        </Row>
      </div>
    );
  }
}

export default Batches;
