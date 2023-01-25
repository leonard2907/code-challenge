import { BigNumber, ethers } from 'ethers';

// Addresses to look up
const addresses = ["0xb5d4f343412dc8efb6ff599d790074d0f1e8d430", "0x0020c5222a24e4a96b720c06b803fb8d34adc0af", "0xd1d8b2aae2ebb2acf013b803bc3c24ca1303a392"]
// $SWTH Token Contract:
const contractAddress = "0xc0ecb8499d8da2771abcbf4091db7f65158f1468"

const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');

// ABI of the token taken from https://bscscan.com/address/0xc0ecb8499d8da2771abcbf4091db7f65158f1468#code
const abi = [
    {
        "inputs": [{
            "internalType": "address",
            "name": "account",
            "type": "address"
        }],
        "name": "balanceOf",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [{
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
        }],
        "stateMutability":"view",
        "type":"function"
    }
]

function printBalance(address: string) {
    const checksumAddress = ethers.utils.getAddress(address);
    const tokenContract = new ethers.Contract(contractAddress, abi, provider);

    tokenContract.decimals().then((decimals: any) => {
        tokenContract.balanceOf(checksumAddress).then((balance: BigNumber) => {
            console.log(`${address} ${ethers.utils.commify(ethers.utils.formatUnits(balance, decimals))}`);
        });
    });
}

addresses.forEach(address => printBalance(address))