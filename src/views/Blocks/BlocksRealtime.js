import React, { Component} from "react";
import agent from "../../agent";
import { Card, CardBody, CardFooter, Button, Table, Row, Col, CardHeader, Spinner } from "reactstrap";
import { Link } from "react-router-dom";

class BlocksRealtime extends Component {
    constructor(props) {
        super(props);

        this.state = {
            blocks: null
        };
    }

    componentDidMount() {
        let self = this;
        setInterval(function() {
            self.getBlocks(10);
        }, 2000);
    };

    loading = () => 
        (
        <Row>
            <Col sm="12" md={{ size: 6}}>
            <Spinner
                color="primary"
                style={{ width: "100px", height: "100px" }}
            />
            </Col>
        </Row>
    );

    async getBlocks() {
        let blocks = await agent.Sawtooth.getBlocks(10);
        if (blocks) {
          this.setState({
            blocks: blocks.data
          });
        }
    }


    render() {
        if(!this.state.blocks) {
            return this.loading()
        }

        return <div className="animated fadeIn">
            <Table borderless>
                    <tr>
                        <th>Height</th>
                        <th>Block ID</th>
                        <th>Previous Block ID</th>
                        <th>Signer Public Key</th>
                    </tr>
                    {this.state.blocks.map((block) => {
                        return (
                            <tr>
                                <td className="text-muted">{"#" + block['header']['block_num']}</td>
                                <td><Link to={"/blocks/" + block['header_signature']}>{block['header_signature'].substring(0,15) + "..."}</Link></td>
                                <td><Link to={"/blocks/" + block['header']['previous_block_id']}>{block['header']['previous_block_id'].substring(0,15) + "..."}</Link></td>
                                <td>{block['header']['signer_public_key'].substring(0,15) + "..."}</td>
                            </tr>
                        )
                    })}
            </Table>
        </div> 
        
    }
}

export default BlocksRealtime;