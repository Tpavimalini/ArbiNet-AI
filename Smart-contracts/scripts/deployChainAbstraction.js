const hre = require("hardhat");

async function main() {
    const ChainAbstraction = await hre.ethers.getContractFactory("ChainAbstraction");
    const chainAbstraction = await ChainAbstraction.deploy();

    await chainAbstraction.deployed();
    console.log("ChainAbstraction deployed at:", chainAbstraction.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
