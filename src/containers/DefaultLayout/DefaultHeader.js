import React, { Component } from "react";
import { Nav } from "reactstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { AppNavbarBrand } from "@coreui/react";
import logo from "../../assets/logo_react_192.png";
import sygnet from "../../assets/logo_react_192.png";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {
    return (
      <React.Fragment>
        {/* <AppSidebarToggler className="d-lg-none" display="md" mobile /> */}
        <AppNavbarBrand
          style={{
            justifyContent: "flex-start",
            paddingLeft: "32px",
            width: "85px",
          }}
          full={{ src: logo, width: 40, height: 40, alt: "" }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: "" }}
        ></AppNavbarBrand>
        <span style={{ fontSize: "1.25rem", fontWeight: "500" }}>
          B4E Explorer
        </span>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
