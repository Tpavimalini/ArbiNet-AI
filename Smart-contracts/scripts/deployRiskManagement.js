const hre = require("hardhat");

async function main() {
    const RiskManagement = await hre.ethers.getContractFactory("RiskManagement");
    const riskManagement = await RiskManagement.deploy();

    await riskManagement.deployed();
    console.log("RiskManagement deployed at:", riskManagement.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
