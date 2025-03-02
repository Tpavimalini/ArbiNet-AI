const hre = require("hardhat");

async function main() {
    const HotWalletIntegration = await hre.ethers.getContractFactory("HotWalletIntegration");
    const hotWalletIntegration = await HotWalletIntegration.deploy();

    await hotWalletIntegration.deployed();
    console.log("HotWalletIntegration deployed at:", hotWalletIntegration.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
