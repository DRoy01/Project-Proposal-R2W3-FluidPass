// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/token/ERC20/IERC20.sol";

interface IFakeDAI is IERC20 {
    function mint(address account, uint256 amount) external;
}
