import web3 from './web3';
import CampaignFactory from './CampaignFactory.json';
import address from './address.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  address
);

console.log(address);

export default instance;
