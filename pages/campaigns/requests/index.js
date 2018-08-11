import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';


import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import RequestRow from '../../../components/RequestRow';
import Campaign from '../../../eth/campaign';
import web3 from '../../../eth/web3';

class RequestIndex extends Component {

  static async getInitialProps(props) {
    const { address } = props.query;

    const campaign = Campaign(address);

    const requestCount = await campaign.methods.getRequestCount().call();
    const approversCount = await campaign.methods.approversCount().call();

    // Grab all the requests on the contract
    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((el, index) =>{
          return campaign.methods.requests(index).call();
        })
    );

    return { address, requests, requestCount, approversCount };
  }

  renderRows() {
    return this.props.requests.map((request, index) => {
      return <RequestRow 
        key={index}
        id={index}
        approversCount={this.props.approversCount}
        request={request}
        address={this.props.address}
      />;
    });
  }

  renderTable() {
    if (this.props.requestCount === '0') return <h4>No Spending Requests</h4>;
    const { Header, Row, HeaderCell, Body } = Table;
    return (
    <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>
          {this.renderRows()}
        </Body>
      </Table>
    );
  }

  render() {
    
    return (
      <Layout>
        <h3>Spending Requests</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary>
              Add Request
            </Button>
          </a>
        </Link>
        {this.renderTable()}
      </Layout>
    );
  }
}

export default RequestIndex;