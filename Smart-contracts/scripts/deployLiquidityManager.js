const hre = require("hardhat");

async function main() {
    const LiquidityManager = await hre.ethers.getContractFactory("LiquidityManager");
    const liquidityManager = await LiquidityManager.deploy();

    await liquidityManager.deployed();
    console.log("LiquidityManager deployed at:", liquidityManager.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
