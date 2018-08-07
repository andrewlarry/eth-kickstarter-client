import Web3 from 'web3';

// window.web3.currentProvider is injected by metamask
// *** Need to refactor to account for non metamask users
const web3 = new Web3(window.web3.currentProvider);

export default web3;