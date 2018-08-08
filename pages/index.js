// The index.js page in a Next application is the component that gets
// delivered when the root route ('/') is requested

import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';


// Next.js doesn't have built in support for css modules
// import 'semantic-ui-css/semantic.min.css';

import Layout from '../components/Layout';
import factory from '../eth/factory';
class CampaignIndex extends Component {

  // "static" defines a "class" function (i.e. does not require an instance of the class)

  // componentDidMount will not be executed on the Next server, use getInitialProps to make
  // async calls for data for initial render
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeloyedCampaigns().call();

    // Returns an object that will be passed as props to the instance of the class
    return { campaigns };
  }

  renderCampaigns() {
    // Create the items for a semantic Card.Group
    const items = this.props.campaigns.map(address => {
      return {
        header: address,
        description: <a>View Campaign</a>,
        fluid: true
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        {/* Next.js doesn't have out of the box support for css modules. Use the CDN link for now. */}
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"></link>
        <h3>Open Campaigns</h3>
        <Button 
          content="Create Campaign"
          icon="add circle"
          floated="right"
          primary
        />
        {this.renderCampaigns()}
      </Layout>
    );
  }
}

export default CampaignIndex;