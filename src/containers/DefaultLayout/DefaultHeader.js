import React, { Component } from 'react';
import {  UncontrolledDropdown, Nav } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/logo.png'
import sygnet from '../../assets/logo.png'

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
          full={{ src: logo, width: 40, height: 40, alt: '' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: '' }}
        />

        <Nav className="d-md-down-none" navbar style={{paddingLeft:"15px"}}>
          <a href="https://storage.v-chain.vn/ipfs/QmfQkD8pBSBCBxWEwFSu4XaDVSWK6bjnNuaWZjMyQbyDub/#/">          Storage Monitoring
          </a>
        </Nav>
        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav direction="down">
            {/* <DropdownToggle nav>
              <img src={'../../assets/logo.png'} className="img-avatar" alt="logo" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
              <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu> */}
          </UncontrolledDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
