// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./interfaces/IHotWallet.sol";

contract HotWalletIntegration {
    function connectHotWallet(address user, string memory walletData) external {
        IHotWallet(HOT_WALLET).registerUser(user, walletData);
    }
}
