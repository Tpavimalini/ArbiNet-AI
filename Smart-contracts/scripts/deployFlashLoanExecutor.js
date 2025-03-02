const hre = require("hardhat");

async function main() {
    const FlashLoanExecutor = await hre.ethers.getContractFactory("FlashLoanExecutor");
    const flashLoanExecutor = await FlashLoanExecutor.deploy(process.env.AAVE_POOL);

    await flashLoanExecutor.deployed();
    console.log("FlashLoanExecutor deployed at:", flashLoanExecutor.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
