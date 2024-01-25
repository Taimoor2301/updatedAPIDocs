import React from 'react';
import { ethers } from 'ethers';
import { TokenAddress } from '../../../../utils/constants';
import { useEthersProvider } from '../../../../utils/eathProvide';
import { useConnect } from 'wagmi';

const AddTokenToMetaMask = () => {
    const {isConnected}=useConnect()
    const addTokenToMM = async () => {
        try {
          const { ethereum } = window
          await ethereum.request({
            method: 'wallet_watchAsset',
            params: {
              type: 'ERC20',
              options: {
                address: TokenAddress,  // ERC20 token address
                symbol: `JPT`,
                decimals: 18,
                image: 'https://imgtr.ee/images/2024/01/22/6a544dfd487162837d53166826afbaf9.png',
              },
            },
          })
        } catch (ex) {
          // We don't handle that error for now
          // Might be a different wallet than Metmask
          // or user declined
          console.error(ex)
        }
      }

    return (
        <button onClick={addTokenToMM } className='text-lg bg-gray-800 text-white  hover:bg-primary font-poppins py-1.5 w-44 rounded-md transition-all duration-500'>
            addTokenToMM 
        </button>
    );
};

export default AddTokenToMetaMask;
