import React, { Component } from "react";
import { Spinner, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import agent from "../../agent";

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transaction: null
    };
  }
  componentDidMount() {
    this.getTransaction();
    
  }
  async getTransaction() {
    let transaction = await agent.Sawtooth.getTransaction(
      this.props.match.params.id
    );
    this.setState({
      transaction: transaction.data
    });
  }
  render() {
    
    let transaction = this.state.transaction;
    if (!this.state.transaction) {
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
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong>
                  <i className="icon-info pr-1"></i>Transaction id:{" "}
                  {this.props.match.params.id}
                </strong>
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                    <tr>
                      <td>txid</td>
                      <td>
                        <strong>{transaction.header_signature}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Transaction Family</td>
                      <td>
                        <strong>{transaction.header.family_name}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Transaction Family Version</td>
                      <td>
                        <strong>{transaction.header.family_version}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Signer Public Key</td>
                      <td>
                        <strong>{transaction.header.signer_public_key}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Nonce</td>
                      <td>
                        <strong>{transaction.header.nonce}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Payload_sha512</td>
                      <td>
                        <strong>{transaction.header.payload_sha512}</strong>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong>
                  <i className="fa fa-sign-in"></i>{"  "}Input:{" "}
                </strong>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <tbody>
                   {transaction.header.inputs.map(input=>{
                     return(
                      <tr>
                      <td>
                        <strong>{input}</strong>
                      </td>
                    </tr>
                     )
                   })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong>
                  <i className="fa fa-sign-out"></i>{"  "}Output:{" "}
                </strong>
              </CardHeader>
              <CardBody>
                <Table responsive  hover>
                  <tbody>
                  {transaction.header.outputs.map(output=>{
                     return(
                      <tr>
                      <td>
                        <strong>{output}</strong>
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
                  <i className="fa fa-newspaper-o"></i>{"  "}Payload:{" "}
                </strong>
              </CardHeader>
              <CardBody>
                 {(transaction.payload)}
              </CardBody>
            </Card>
          </Col>
         </Row>
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong>
                  <i className="fa fa-newspaper-o"></i>{"  "}Payload decoded:{" "}
                </strong>
              </CardHeader>
              <CardBody>
                 { window.atob(transaction.payload)}
              </CardBody>
            </Card>
          </Col>
         </Row>

      
      </div>
    );
  }
}

export default Transaction;
