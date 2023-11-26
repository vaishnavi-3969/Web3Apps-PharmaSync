const hre = require("hardhat")
const { items } = require("../src/items.json")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  //setup accounts
  const [deployer] = await ethers.getSigners()
  console.log(deployer.address)

  //deploy contract
  const PharmaSync = await hre.ethers.getContractFactory("Medicine")
  const pharmaSync = await PharmaSync.deploy()
  await pharmaSync.deployed()
  console.log("PharmaSync deployed to:", pharmaSync.address)

  //list items
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const tx = await pharmaSync.list(
      item.id,
      item.name,
      item.category,
      item.image,
      tokens(item.cost),
      item.rating,
      item.stock
    )
    await tx.wait()
    console.log(`Item ${i + 1} listed`)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
