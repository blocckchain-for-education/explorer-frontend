import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table ,Spinner} from "reactstrap";
import agent from "../../agent";
import { Link } from 'react-router-dom';

class Block extends Component {
  constructor(props) {
    super(props);

    this.state = {
      block: null
    };
  }
  componentDidMount() {
    this.getBlock();
  }

  async getBlock() {
    let block = await agent.Sawtooth.getBlock(
      this.props.match.params.id
    );
    this.setState({
        block: block.data
    });
  }
  render() {
    let block = this.state.block;

    // const transactionDetails = transaction ? Object.entries(transaction) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]
    if (!this.state.block) {
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
      <div className="animated fadeIn" style={{"fontSize":"14px"}}>
        <Row>
          <Col lg="12">
            <Card>
              <CardHeader>
                <i className="icon-info pr-1"></i>Block{" "}
                <strong>
                  {"#" + block.header.block_num}
                </strong>
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                    <tr key={block.header_signature}>
                      <td>Block ID</td>
                      <td>
                        <strong>{block.header_signature}</strong>
                      </td>
                    </tr>
                    
                    <tr key={block.header.previous_block_id}>
                      <td>Previous Block ID</td>
                      <td>
                        <strong>{block.header.previous_block_id}</strong>
                      </td>
                    </tr>

                    <tr key={block.header.block_num}>
                      <td>Height</td>
                      <td>
                        <strong>{block.header.block_num}</strong>
                      </td>
                    </tr>
                   
                    <tr key={block.header.signer_public_key}>
                      <td>Signer Public Key</td>
                      <td>
                        <strong>{block.header.signer_public_key}</strong>
                      </td>
                    </tr>

                    <tr key={block.header.consensus}>
                      <td>Consensus</td>
                      <td>
                        <strong>{block.header.consensus}</strong>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg="12">
            <Card>
              <CardHeader>
                <strong>
                  <i className="fa fa-sign-in"></i>{"  "}Transactions:{" "}
                </strong>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <tbody>
                   {block.batches[0].header.transaction_ids.map(transaction_id=>{
                     return(
                      <tr key={transaction_id}>
                      <td>
                      <Link to={`/transactions/${transaction_id}`}>{transaction_id}</Link>
                      </td>
                    </tr>
                     )
                   })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
    
        </Row>

      
      </div>
    );
  }
}

export default Block;
