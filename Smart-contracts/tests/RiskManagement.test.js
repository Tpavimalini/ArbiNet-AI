const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RiskManagement", function () {
    let RiskManagement, riskManager, owner;

    beforeEach(async function () {
        [owner] = await ethers.getSigners();
        RiskManagement = await ethers.getContractFactory("RiskManagement");
        riskManager = await RiskManagement.deploy();
        await riskManager.deployed();
    });

    it("Should detect liquidation risks", async function () {
        expect(await riskManager.detectLiquidationRisk(ethers.utils.parseEther("100"), ethers.utils.parseEther("110"))).to.equal(true);
    });

    it("Should mitigate risk when detected", async function () {
        await expect(riskManager.mitigateRisk()).to.emit(riskManager, "RiskMitigated");
    });
});
