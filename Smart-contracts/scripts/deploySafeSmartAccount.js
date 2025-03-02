const hre = require("hardhat");

async function main() {
    const SafeSmartAccount = await hre.ethers.getContractFactory("SafeSmartAccount");
    const safeSmartAccount = await SafeSmartAccount.deploy();

    await safeSmartAccount.deployed();
    console.log("SafeSmartAccount deployed at:", safeSmartAccount.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
