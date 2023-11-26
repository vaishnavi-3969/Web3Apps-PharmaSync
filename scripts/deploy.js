const hre = require("hardhat")
const { items } = require("../src/items.json")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts
  const [deployer] = await ethers.getSigners()

  // deploy
  const Medicine = await hre.ethers.getContractFactory("Medicine")
  const medicine = await Medicine.deploy()
  await medicine.deployed()

  console.log(`Deployed Contract at: ${medicine.address}\n`)

  //list items
  for (let i = 0; i < items.length; i++) {
    const transaction = await medicine.connect(deployer).list(
      items[i].id,
      items[i].name,
      items[i].category,
      items[i].image,
      tokens(items[i].price),
      items[i].rating,
      items[i].stock,
    )

    await transaction.wait()

    console.log(`Listed item ${items[i].id}: ${items[i].name}`)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});