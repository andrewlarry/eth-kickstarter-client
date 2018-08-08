import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';

import { Router } from '../../routes';
import Layout from '../../components/Layout';
import factory from '../../eth/factory';
import web3 from '../../eth/web3';

class CampaignNew extends Component {
  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false
  };

  // Use this syntax to prevent binding 'this'
  onSubmit = async (event) => {
    // Prevent form submission
    event.preventDefault();

    // Start the button spinner
    this.setState({ loading: true, errorMessage: '' });

    try {
      // Grab the metamask accounts
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0]
        });
      Router.pushRoute('/');
    } catch(err) {
      this.setState({ errorMessage: err.message });
    }

    // Resolve spinner
    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>Create a Campaign</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="Wei" 
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={event => this.setState({ minimumContribution: event.target.value })}
            />
          </Form.Field>
          <Message 
            error
            header="Error!"
            content={this.state.errorMessage}
          />
          <Button loading={this.state.loading} primary>Create</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;