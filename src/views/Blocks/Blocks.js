import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
function BlockRow(props) {
  const block = props.block;
  const txLink = `/blocks/${block.header_signature}`;
  return (
    <tr key={block.header_signature.toString()}>
      <th scope="row">
        <Link to={txLink}>{block.header_signature.substring(0, 15)}...</Link>
      </th>
      <td>
        <Link to={txLink}>{block.header.block_num}</Link>
      </td>
      <td>{block.header.consensus}</td>
      <td>{block.header.signer_public_key.substring(0, 15)}...</td>
      <td>
        <ul>
          {block.header.batch_ids.map(batch_id => {
            return (
              <li>
                <Link to={`/batches/${batch_id}`}>{batch_id.substring(0,100)}...</Link>
              </li>
            );
          })}
        </ul>
      </td>
     
    </tr>
  );
}

class Blocks extends Component {
  componentDidMount() {}
  render() {
    let blocksData = this.props.blocks;
    if (!blocksData) {
      return "Loading...";
    }
    return (
      <div className="animated fadeIn">
          <Table responsive hover>
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Block number</th>
                <th scope="col">Consensus</th>
                <th scope="col">Signer Public Key</th>
                <th scope="col">Batches</th>
              </tr>
            </thead>
            <tbody>
              {blocksData.map((block, index) => (
                <BlockRow key={Math.random()} block={block} />
              ))}
            </tbody>
          </Table>
      </div>
    );
  }
}

export default Blocks;
