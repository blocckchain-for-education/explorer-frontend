import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
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
    // const user = usersData.find( user => user.id.toString() === this.props.match.params.id)
    let block = this.state.block;

    // const transactionDetails = transaction ? Object.entries(transaction) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]
    if (!this.state.block) {
      return "Loading...";
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong>
                  <i className="icon-info pr-1"></i>Block id:{" "}
                  {this.props.match.params.id}
                </strong>
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                    <tr>
                      <td>block id</td>
                      <td>
                        <strong>{block.header_signature}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Block Number</td>
                      <td>
                        <strong>{block.header.block_num}</strong>
                      </td>
                    </tr>
                   
                    <tr>
                      <td>Signer Public Key</td>
                      <td>
                        <strong>{block.header.signer_public_key}</strong>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong>
                  <i className="fa fa-sign-in"></i>{"  "}Batchs:{" "}
                </strong>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <tbody>
                   {block.header.batch_ids.map(batch_id=>{
                     return(
                      <tr>
                      <td>
                          
                      <Link to={`/batches/${batch_id}`}>{batch_id}</Link>
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
        <Row>
          <Col lg={12}>
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
                      <tr>
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
