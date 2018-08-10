import React, { Component } from 'react';

import Layout from '../../components/Layout';
import Campaign from '../../eth/campaign.js';

class CampaignShow extends Component {

  static async getInitialProps({ query }) {
    // web3 contract instance 
    const campaign = Campaign(query.address);

    // Grab the summary from the contract
    const summary = await campaign.methods.getSummary().call()

    // The return object will be passed as props
    return {
      minimumContribution: summary[0],
      balance: summary[1],
      requestCount: summary[2],
      approversCount: summary[3],
      manager: summary[4]
    };
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