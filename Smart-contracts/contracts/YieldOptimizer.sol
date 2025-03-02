// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./interfaces/ICompound.sol";
import "./interfaces/IAaveV3Pool.sol";

contract YieldOptimizer {
    function allocateFunds(address protocol, uint256 amount) external {
        if (protocol == COMPOUND) {
            ICompound(COMPOUND).supply(amount);
        } else if (protocol == AAVE) {
            IAaveV3Pool(AAVE).supply(amount);
        }
    }
}
