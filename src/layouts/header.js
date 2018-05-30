import React, { Component } from 'react';
import '../css/header.css';
import logo from '../images/logo.png';
import {ActionButtons} from '../components/action-buttons';


export class Header extends Component {
 render() {
    return (
        <header>
            <div className="header-part">
              <div className="page-logo">
                <figure className="logo">
                  <img src={logo} alt="Carma Networks" title="Carma Networks" />
                </figure>
              </div>
              <div className="header-title">Transit Signal Priority</div>
          <ActionButtons srmenable={this.props.srmenable} ssmenable={this.props.ssmenable} clearData={this.props.clearData} 
          toggleNotifications={this.props.toggleNotifications} toggleBus={this.props.toggleBus}/>
            </div>
        </header>

    );
  }
}
