const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CrossChainArbitrage", function () {
    let CrossChainArbitrage, arbitrageContract, owner, user;

    beforeEach(async function () {
        [owner, user] = await ethers.getSigners();
        CrossChainArbitrage = await ethers.getContractFactory("CrossChainArbitrage");
        arbitrageContract = await CrossChainArbitrage.deploy();
        await arbitrageContract.deployed();
    });

    it("Should identify arbitrage opportunities", async function () {
        const price1 = ethers.utils.parseEther("100");
        const price2 = ethers.utils.parseEther("105");
        expect(await arbitrageContract.detectArbitrage(price1, price2)).to.equal(true);
    });

    it("Should execute arbitrage trade successfully", async function () {
        await expect(arbitrageContract.executeArbitrage())
            .to.emit(arbitrageContract, "ArbitrageExecuted");
    });

    it("Should revert if no arbitrage opportunity exists", async function () {
        await expect(arbitrageContract.executeArbitrage()).to.be.revertedWith("No arbitrage opportunity");
    });
});
