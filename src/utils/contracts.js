const ethers = require('ethers');
import { useEthersProvider } from './eathProvide';
// Replace with the actual contract address and ABI

const contractAddress = '';
const abi = []; // Replace with the actual ABI array


const ccontract =async()=>{
const provider=useEthersProvider()

const contract = new ethers.Contract(contractAddress, abi,provider);
return contract
}


// Function to change the contract owner
async function changeOwner(newOwner) {
    const tx = await contract.changeOwner(newOwner);
    await tx.wait();
}

// Function to change the transaction fee
async function changeFee(newFee) {
    const tx = await contract.changeFee(newFee);
    await tx.wait();
}

// Function to mark an item as sold by ID
async function markItemAsSold(itemId) {
    const tx = await contract.markItemAsSold(itemId);
    await tx.wait();
}

// Function to mark an item as unsold by ID
async function markItemAsUnsold(itemId) {
    const tx = await contract.markItemAsUnsold(itemId);
    await tx.wait();
}

// Function to blacklist a user
async function blacklistUser(user) {
    const tx = await contract.blacklistUser(user);
    await tx.wait();
}

// Function to whitelist a user
async function whitelistUser(user) {
    const tx = await contract.whitelistUser(user);
    await tx.wait();
}

// Function to create a new item
async function createItem(itemId, priceInEth, priceInToken, uri, isUnlimited, saleEndTime) {
    const tx = await contract.createItem(itemId, priceInEth, priceInToken, uri, isUnlimited, saleEndTime);
    await tx.wait();
}

// Function to buy an item with ETH
async function buyWithEth(itemId, value) {
    const overrides = { value: ethers.utils.parseEther(value.toString()) };
    const tx = await contract.buyWithEth(itemId, overrides);
    await tx.wait();
}

// Function to buy an item with ERC20 token
async function buyWithToken(itemId, tokenAmount) {
    const tx = await contract.buyWithToken(itemId, tokenAmount);
    await tx.wait();
}

