import Web3 from 'web3';

import { TEST_ENDPOINT } from '../config/infura';

// Next.js does SSR, so window is unavailable
let web3;

// Weird work around because typeof if not working correctly
let injected = false;

if (typeof global !== 'undefined') {
  if (global.web3 !== undefined) injected = true;
}

if (typeof global !== 'undefined' && injected) {
  // window.web3.currentProvider is injected by metamask
  web3 = new Web3(global.web3.currentProvider);
} else {
  // Running on server or user not using metamask
  const provider = new Web3.providers.HttpProvider(TEST_ENDPOINT);
  web3 = new Web3(provider);
}

export default web3;