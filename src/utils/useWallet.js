import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { TokenAddress } from './constants';
import { useEthersSigner } from './EthSigner';
import { useAccount } from 'wagmi';
const contractABI = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "name": "safeTransferFrom",
        "type": "function",
        "inputs": [
            {
                "name": "from",
                "type": "address"
            },
            {
                "name": "to",
                "type": "address"
            },
            {
                "name": "value",
                "type": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ]
    },
    {
        "name": "approve",
        "type": "function",
        "inputs": [
            {
                "name": "spender",
                "type": "address"
            },
            {
                "name": "value",
                "type": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ]
    }
];






const useWallet = () => {
    const [balance, setBalance] = useState(0);
    const signer = useEthersSigner()
    const { address } = useAccount()

    // Function to get the balance of the connected account
    const getBalanceOf = async () => {
        if (!signer) return;
        const contract = new ethers.Contract(TokenAddress, contractABI, signer);
        const balance = await contract.balanceOf(address);

        setBalance(
            ethers.formatEther(balance)?.toFixed(2)
        );
        console.log(ethers.utils.formatEther(balance))
    };

    // Function to safely transfer tokens
    const safeTransfer = async ( to, value) => {
        if (!signer) return;

        try {
            const contract = new ethers.Contract(TokenAddress, contractABI, signer);
            const result = await contract.ssafeTransferFrom(address,to, value);
            console.log('Safe Transfer Result:', result);
        } catch (error) {
            console.error('Error in Safe Transfer:', error.message);
        }
    };

    // Function to approve spending of tokens
    const approve = async (spender, value) => {
        if (!signer) return;

        try {
            const contract = new ethers.Contract(TokenAddress, contractABI, signer);
            const result = await contract.approve(spender, value);
            console.log('Approve Result:', result);
        } catch (error) {
            console.error('Error in Approve:', error.message);
        }
    };

    // Effect to fetch the balance when the signer changes
    useEffect(() => {
        getBalanceOf();
    }, [address]);



    return {
        balance,
        safeTransfer,
        approve,
        getBalanceOf,
    };
};

export default useWallet;
