// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./interfaces/IAaveV3Pool.sol";

contract RiskManagement {
    function monitorLiquidation(address user) external {
        uint256 healthFactor = IAaveV3Pool(AAVE_POOL).getUserAccountData(user).healthFactor;
        if (healthFactor < 1e18) {
            // Take risk mitigation action
        }
    }
}
