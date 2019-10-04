import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import agent from "../../agent";
import { Link } from 'react-router-dom';

class Batch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      batch: null
    };
  }
  componentDidMount() {
    this.getBatch();
  }
  async getBatch() {
    let batch = await agent.Sawtooth.getBatch(
      this.props.match.params.id
    );
    this.setState({
        batch: batch.data
    });
  }
  render() {
    // const user = usersData.find( user => user.id.toString() === this.props.match.params.id)
    let batch = this.state.batch;

    // const transactionDetails = transaction ? Object.entries(transaction) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]
    if (!this.state.batch) {
      return "Loading...";
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong>
                  <i className="icon-info pr-1"></i>Batch id:{" "}
                  {this.props.match.params.id}
                </strong>
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                    <tr>
                      <td>batch id</td>
                      <td>
                        <strong>{batch.header_signature}</strong>
                      </td>
                    </tr>
      
                   
                    <tr>
                      <td>Signer Public Key</td>
                      <td>
                        <strong>{batch.header.signer_public_key}</strong>
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
                  <i className="fa fa-sign-in"></i>{"  "}Transactions:{" "}
                </strong>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <tbody>
                   {batch.header.transaction_ids.map(transaction_id=>{
                     return(
                      <tr>
                      <td>
                          
                      <Link to={`/transactions/${transaction_id}`}>{transaction_id}</Link>                      </td>
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

export default Batch;
