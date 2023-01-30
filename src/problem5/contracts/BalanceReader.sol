// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/interfaces/IERC20.sol";

contract BalanceReader {
    struct TokenBalance {
        address token;
        uint256 balance;
    }

    mapping(address => mapping(address => uint256)) public balances;

    function getBalances(address _owner, address[] memory _tokenAddresses) public view returns (TokenBalance[] memory) {
        uint256 length = _tokenAddresses.length;
        TokenBalance[] memory result = new TokenBalance[](length);

        for (uint256 i = 0; i < length; i++) {
            IERC20 token = IERC20(_tokenAddresses[i]);
            result[i].token = _tokenAddresses[i];
            result[i].balance = token.balanceOf(_owner);
        }

        return result;
    }
}