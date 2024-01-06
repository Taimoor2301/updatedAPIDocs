import { ethers } from 'ethers';
// import { useEthersProvider } from './eathProvide';
import JaguarPalace from './abi.json'
import { MarketAddress } from './constants';
const Contract =  async (provider) => {
    const contractInstance = new ethers.Contract(MarketAddress, JaguarPalace.abi, provider);
    return contractInstance ;
};

export default Contract;

