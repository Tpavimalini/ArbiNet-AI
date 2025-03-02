const hre = require("hardhat");

async function main() {
    const CrossChainArbitrage = await hre.ethers.getContractFactory("CrossChainArbitrage");
    const crossChainArbitrage = await CrossChainArbitrage.deploy();

    await crossChainArbitrage.deployed();
    console.log("CrossChainArbitrage deployed at:", crossChainArbitrage.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
