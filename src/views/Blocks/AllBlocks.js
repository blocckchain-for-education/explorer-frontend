import React, { Component } from "react";
import { Link } from "react-router-dom";
import agent from "../../agent";
import { Row, Col, Spinner, Card, CardHeader, CardBody, Table} from "reactstrap";



function BlockRow(props) {
    const block = props.block;
    const bkLink = `/blocks/${block.header_signature}`;
  
    return (
        <tr>
            <td>
                <div className="text-muted">{"#" + block.header.block_num}</div>
            </td>
            <td>
                <Link to={bkLink}>
                    {block.header_signature.substring(0, 15) + "..."}
                </Link>
            </td>
            <td>
                {block.header.previous_block_id !== "0000000000000000" ? (
                    <Link to={"/blocks/" + block.header.previous_block_id}>
                        {block.header.previous_block_id.substring(0,15) + "..."}
                    </Link>
                ) : (
                    block.header.previous_block_id.substring(0,15) + "..."
                )}
                
            </td>
            <td>
                {block.header.consensus}
            </td>
            <td>
                {block.header.signer_public_key}
            </td>
        </tr>
    //   <tr key={block.header_signature.toString()}>
    //     <th scope="row">
    //       <Link to={bkLink}>
    //         {block.header_signature.substring(0, 15)}...
    //       </Link>
    //     </th>
    //     <td>
    //       <Link to={bkLink}>{block.header.family_name}</Link>
    //     </td>
    //     <td>{block.header.family_version}</td>
    //     <td>{block.header.signer_public_key.substring(0, 15)}...</td>
    //     <td>{block.payload.substring(0, 75)}...</td>
    //   </tr>
    );
}

class AllBlocks extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            blocks: null
        }
    }
    
    componentDidMount() {
        this.getAllBlocks();
      }
      async getAllBlocks() {
        let blocks = await agent.Sawtooth.getAllBlocksReal();
        this.setState({
          blocks: blocks.data
        });
    }

    render() {
        let blocksData = this.state.blocks;
    if (!blocksData) {
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
            All Blocks
          </CardHeader>
          <CardBody>
            <Table responsive hover>
              <thead>
                <tr>
                  <th scope="col">Height</th>
                  <th scope="col">Block ID</th>
                  <th scope="col">Previous Block ID</th>
                  <th scope="col">Consensus</th>
                  <th scope="col">Signer Public Key</th>
                </tr>
              </thead>
              <tbody>
                {blocksData.map((block, index) => (
                  <BlockRow key={index} block={block} />
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card> 
      </div>
    );
    }
}

export default AllBlocks;