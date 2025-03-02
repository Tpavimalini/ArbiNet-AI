const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LiquidityManager", function () {
    let LiquidityManager, liquidityManager, owner;

    beforeEach(async function () {
        [owner] = await ethers.getSigners();
        LiquidityManager = await ethers.getContractFactory("LiquidityManager");
        liquidityManager = await LiquidityManager.deploy();
        await liquidityManager.deployed();
    });

    it("Should allocate liquidity correctly", async function () {
        await liquidityManager.allocateLiquidity("0xUniswapPool", ethers.utils.parseEther("5"));
        expect(await liquidityManager.getLiquidity("0xUniswapPool")).to.equal(ethers.utils.parseEther("5"));
    });

    it("Should rebalance liquidity based on AI strategy", async function () {
        await liquidityManager.rebalanceLiquidity();
        expect(await liquidityManager.getCurrentStrategy()).to.not.be.null;
    });
});
