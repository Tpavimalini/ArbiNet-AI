const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FlashLoanExecutor", function () {
    let FlashLoanExecutor, flashLoanContract, owner;

    beforeEach(async function () {
        [owner] = await ethers.getSigners();
        FlashLoanExecutor = await ethers.getContractFactory("FlashLoanExecutor");
        flashLoanContract = await FlashLoanExecutor.deploy();
        await flashLoanContract.deployed();
    });

    it("Should execute flash loan successfully", async function () {
        await expect(flashLoanContract.executeFlashLoan(ethers.utils.parseEther("10")))
            .to.emit(flashLoanContract, "FlashLoanExecuted");
    });

    it("Should revert if loan not repaid", async function () {
        await expect(flashLoanContract.executeFlashLoan(ethers.utils.parseEther("100"))).to.be.revertedWith("Loan repayment failed");
    });
});
