// The index.js page in a Next application is the component that gets
// delivered when the root route ('/') is requested

import React, { Component } from 'react';

import factory from '../eth/factory';

// Render the list of campaigns created by the factory contract

class CampaignIndex extends Component {

  // "static" defines a "class" function (i.e. does not require an instance of the class)

  // componentDidMount will not be executed on the Next server, use getInitialProps to make
  // async calls for data for initial render
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeloyedCampaigns().call();

    // Returns an object that will be passed as props to the instance of the class
    return { campaigns };
  }

  render() {
    return (
      <h1>{this.props.campaigns[0]}</h1>
    );
    
  }
}

export default CampaignIndex;