const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("YieldOptimizer", function () {
    let YieldOptimizer, yieldOptimizer, owner;

    beforeEach(async function () {
        [owner] = await ethers.getSigners();
        YieldOptimizer = await ethers.getContractFactory("YieldOptimizer");
        yieldOptimizer = await YieldOptimizer.deploy();
        await yieldOptimizer.deployed();
    });

    it("Should stake funds and generate yield", async function () {
        await yieldOptimizer.stakeFunds(ethers.utils.parseEther("10"));
        expect(await yieldOptimizer.getStakedAmount(owner.address)).to.equal(ethers.utils.parseEther("10"));
    });

    it("Should withdraw funds with yield", async function () {
        await yieldOptimizer.stakeFunds(ethers.utils.parseEther("10"));
        await yieldOptimizer.withdrawFunds();
        expect(await yieldOptimizer.getStakedAmount(owner.address)).to.equal(ethers.utils.parseEther("0"));
    });
});
