const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SafeSmartAccount", function () {
    let SafeSmartAccount, safeSmartAccount, owner, user1, user2;

    beforeEach(async function () {
        [owner, user1, user2] = await ethers.getSigners();
        SafeSmartAccount = await ethers.getContractFactory("SafeSmartAccount");
        safeSmartAccount = await SafeSmartAccount.deploy();
        await safeSmartAccount.deployed();
    });

    it("Should initialize with correct owner", async function () {
        expect(await safeSmartAccount.owner()).to.equal(owner.address);
    });

    it("Should allow owner to execute transactions", async function () {
        await expect(safeSmartAccount.executeTransaction(user1.address, ethers.utils.parseEther("1")))
            .to.emit(safeSmartAccount, "TransactionExecuted");
    });

    it("Should prevent non-owner from executing transactions", async function () {
        await expect(
            safeSmartAccount.connect(user1).executeTransaction(user2.address, ethers.utils.parseEther("1"))
        ).to.be.revertedWith("Not authorized");
    });

    it("Should allow deposits", async function () {
        await owner.sendTransaction({
            to: safeSmartAccount.address,
            value: ethers.utils.parseEther("2"),
        });
        expect(await ethers.provider.getBalance(safeSmartAccount.address)).to.equal(ethers.utils.parseEther("2"));
    });
});
