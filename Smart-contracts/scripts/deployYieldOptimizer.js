const hre = require("hardhat");

async function main() {
    const YieldOptimizer = await hre.ethers.getContractFactory("YieldOptimizer");
    const yieldOptimizer = await YieldOptimizer.deploy();

    await yieldOptimizer.deployed();
    console.log("YieldOptimizer deployed at:", yieldOptimizer.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
