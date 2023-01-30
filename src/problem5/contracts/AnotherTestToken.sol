// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AnotherTestToken is ERC20 {
    uint constant _initial_supply = 100 * (10**18);
    constructor() ERC20("AnotherTestToken", "AT") {
        _mint(msg.sender, _initial_supply);
    }
}
