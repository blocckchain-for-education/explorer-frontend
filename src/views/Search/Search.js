import React, { Component } from "react";
import { Card } from "reactstrap";
import agent from "../../agent";
import { Redirect } from "react-router-dom";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  Input,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardBody,
} from "reactstrap";

class Search extends Component {
  constructor(props) {
    super(props);

    this.search = this.search.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.inputValue = this.inputValue.bind(this);

    this.state = {
      id: null,
      block: null,
      transaction: null,
      dropdownValue: null,
      dropdownOpen: false,
      message: null,
    };
  }

  toggleDropdown(e) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  changeValue(e) {
    this.setState({
      dropdownValue: e.target.value,
    });
  }

  search(e) {
    switch (this.state.dropdownValue) {
      case "Block":
        this.getBlock(this.state.id);
        break;
      case "Transaction":
        this.getTransaction(this.state.id);
        break;
      default:
        break;
    }
  }

  inputValue(e) {
    this.setState({
      id: e.target.value,
    });
  }

  async getBlock(id) {
    try {
      let block = await agent.Sawtooth.getBlock(id);
      if (block) {
        this.setState({
          block: block.data,
        });
      } else {
        this.setState({
          message: "Block Not Found! Please check the ID",
        });
      }
    } catch (error) {
      this.setState({
        message: "Block Not Found! Please check the ID",
      });
    }
  }

  async getTransaction(id) {
    try {
      let transaction = await agent.Sawtooth.getTransaction(id);
      if (transaction) {
        this.setState({
          transaction: transaction.data,
        });
      } else {
        this.setState({
          message: "Transaction Not Found! Please check the ID",
        });
      }
    } catch (error) {
      this.setState({
        message: "Transaction Not Found! Please check the ID",
      });
    }
  }

  render() {
    if (this.state.block) {
      return <Redirect to={"/blocks/" + this.state.block.header_signature} />;
    }

    if (this.state.transaction) {
      return (
        <Redirect
          to={"/transactions/" + this.state.transaction.header_signature}
        />
      );
    }

    return (
      <Card>
        <CardBody>
          <InputGroup>
            <InputGroupButtonDropdown
              addonType="prepend"
              isOpen={this.state.dropdownOpen}
              toggle={this.toggleDropdown}
            >
              <DropdownToggle caret color="light">
                {this.state.dropdownValue != null
                  ? this.state.dropdownValue
                  : "Select"}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem value="Block" onClick={this.changeValue}>
                  Block
                </DropdownItem>
                <DropdownItem value="Transaction" onClick={this.changeValue}>
                  Transaction
                </DropdownItem>
              </DropdownMenu>
            </InputGroupButtonDropdown>
            <Input
              placeholder="Search by Block / Transaction"
              name="id"
              type="text"
              onChange={this.inputValue}
            />
            <InputGroupAddon addonType="append">
              <Button color="primary" onClick={this.search}>
                <i className="fa fa-search" aria-hidden="true"></i>
              </Button>
            </InputGroupAddon>
          </InputGroup>
          <span className="text-danger">
            {this.state.message ? this.state.message : null}
          </span>
        </CardBody>
      </Card>
    );
  }
}

export default Search;
