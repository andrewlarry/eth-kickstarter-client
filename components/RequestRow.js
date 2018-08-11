import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';

import Campaign from '../eth/campaign';
import web3 from '../eth/web3';

class RequestRow extends Component {
  state = {};

  onApprove = async () => {
    const { address, id } = this.props;
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(id).send({
      from: accounts[0]
    });
  };

  onFinialize = async () => {
    const { address, id } = this.props;
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(id).send({
      from: accounts[0]
    });
  }

  render() {
    const { Row, Cell } = Table;
    const { id, request, approversCount } = this.props;
    const readyToFinialize = request.approvalCount > (approversCount / 2);

    return (
      <Row disabled={request.complete} positive={readyToFinialize && !request.complete}>
        <Cell>{id + 1}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>{request.approvalCount} / {approversCount}</Cell>
        <Cell>
          {request.complete ? null : (
              <Button color="green" basic onClick={this.onApprove}>
                Approve
              </Button>
            )
          }
        </Cell>
        <Cell>
          {request.complete ? null : (
              <Button color="teal" basic onClick={this.onFinialize}>
                Finalize
              </Button>
            )
          }
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;