import React, { Component } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';

import { Link, Router } from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../eth/campaign';
import web3 from '../../../eth/web3';

class RequestNew extends Component {
  state = {
    value: '',
    description: '',
    recipient: '',
    errorMessage: '',
    loading: false
  };

  static async getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }

  onSubmit = async event => {
    event.preventDefault();

    // Get the web3 API for the deployed campaign contract
    const campaign = Campaign(this.props.address);

    const { description, value, recipient } = this.state;

    // Set loading flag and reset the errorMessage
    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();

      // Attempt to create a new spending request
      await campaign.methods.createRequest(
        description, 
        web3.utils.toWei(value, 'ether'),
        recipient
      ).send({ from: accounts[0] });

      // Route the user back the the requests page
      Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false, value: '' });
  };

  render() {
    return (
      <Layout>
        <h3>Create a Spending Request</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Description</label>
            <Input 
              value={this.state.description}
              onChange={event => this.setState({ description: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Value (ether)</label>
            <Input 
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Recipient</label>
            <Input 
              value={this.state.recipient}
              onChange={event => this.setState({ recipient: event.target.value })}
            />
          </Form.Field>
          <Message error header="Error" content={this.state.errorMessage}/>
          <Button primary loading={this.state.loading}>
            Create
          </Button>
        </Form>


      </Layout>
    );
  }
}

export default RequestNew;