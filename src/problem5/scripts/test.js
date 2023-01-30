const { ethers } = require("ethers");

const ADDR = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const ABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "balances",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        },
        {
          "internalType": "address[]",
          "name": "_tokenAddresses",
          "type": "address[]"
        }
      ],
      "name": "getBalances",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "balance",
              "type": "uint256"
            }
          ],
          "internalType": "struct BalanceReader.TokenBalance[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

const ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const TOKENS = [
  	"0x5FbDB2315678afecb367f032d93F642f64180aa3",
	"0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
];

// you can use your own RPC provider url (no need to deploy to mainnet)
const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');

const test = async () => {
	const contract = new ethers.Contract(ADDR, ABI, provider);
	const balances = await contract.getBalances(ADDRESS, TOKENS);
	return balances;
};

test().then(console.log);