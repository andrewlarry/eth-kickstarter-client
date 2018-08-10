import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';

import Layout from '../../components/Layout';
import Campaign from '../../eth/campaign.js';
import web3 from '../../eth/web3';

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

  renderCards() {
    const { minimumContribution, balance, requestCount, approversCount, manager } = this.props;
    const items = [
      {
        header: manager,
        meta: 'Address of Manager',
        description: 'The manager is the creator of campaign. The manager can create and finalize spending requests.',
        style: { overflowWrap: 'break-word'}
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description: 'The minimum contributor in wei to become a campaign approver.',
        style: { overflowWrap: 'break-word'}
      },
      {
        header: requestCount,
        meta: 'Number of Requests',
        description: 'The number of spending requests the manager has issued.',
        style: { overflowWrap: 'break-word'}
      },
      {
        header: approversCount,
        meta: 'Number of Approvers',
        description: 'The number of people that have donated to the campaign.',
        style: { overflowWrap: 'break-word'}
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description: 'The balance is the amount of fund the campaign has left to spend.',
        style: { overflowWrap: 'break-word'}
      }
    ];

    return <Card.Group items={items} />
  }

  render() {
    return(
      <Layout>
        <h2>Campaign Page</h2>
        {this.renderCards()}
      </Layout>
    );
  }
}

export default CampaignShow;