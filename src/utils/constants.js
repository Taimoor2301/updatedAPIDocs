// export const API_BASE_URL = "http://127.0.0.1:8000/api";
export const API_BASE_URL = "https://api.nadeemakhtarandco.com/api";
export const MarketAddress = "0x9868Bc8528013CBc675b411bF56d48A2Ed670920";
export const TokenAddress = "0x6bab579C6A8aBBb0BEf0ecE1b2F66cE12b9F07aD";

export const approveAbi=[
    {
      "constant": false,
      "inputs": [
        {
          "name": "spender",
          "type": "address"
        },
        {
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]