import React, { Component } from 'react';
import '../css/header.css';
import logo from '../images/logo.png';
import LearLogo from '../images/lear-logo.png';

import {ActionButtons} from '../components/action-buttons';


export class Header extends Component {
 render() {
    return (
        <header>
            <div className="header-part">
              <div className="page-logo">
                <figure className="logo">
                  <div className="row" id="banner">
                    <div className="column">
                      <img src={logo} alt="Carma Networks" title="Carma Networks" />
                    </div>
                    <div className="column">
                      <img src={LearLogo} alt="Lear Corporation" title="Lear" />
                    </div>
                </div>
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
