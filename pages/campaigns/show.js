import React, { Component } from 'react';

import Layout from '../../components/Layout';
import Campaign from '../../eth/campaign.js';

class CampaignShow extends Component {

  static async getInitialProps({ query }) {
    // web3 contract instance 
    const campaign = Campaign(query.address);

    const summary = await campaign.methods.getSummary().call()
    console.log(summary);
    return {};
  }

  render() {
    return(
      <Layout>
        <h2>Campaign Page</h2>
      </Layout>
    );
  }
}

export default CampaignShow;