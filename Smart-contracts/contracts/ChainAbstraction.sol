// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./interfaces/IBitteChainAgent.sol";

contract ChainAbstraction {
    function executeTransaction(address chain, bytes memory data) external {
        IBitteChainAgent(BITTE_AGENT).relayTransaction(chain, data);
    }
}
