const hre = require("hardhat");

async function main() {
  console.log("Deploying VotingSystem contract...");

  // Get the contract factory
  const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");
  
  // Deploy the contract
  const votingSystem = await VotingSystem.deploy();
  await votingSystem.deployed();

  console.log("VotingSystem deployed to:", votingSystem.address);

  // Verify the contract on Etherscan (if not on localhost)
  if (hre.network.name !== "localhost" && hre.network.name !== "hardhat") {
    console.log("Waiting for block confirmations...");
    await votingSystem.deployTransaction.wait(6);
    
    console.log("Verifying contract...");
    await hre.run("verify:verify", {
      address: votingSystem.address,
      constructorArguments: [],
    });
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 