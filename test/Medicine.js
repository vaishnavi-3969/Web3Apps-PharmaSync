
const { expect } = require("chai")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("Medicine", () => {
  let medicine;
  let deployer, buyer;

  beforeEach(async() => {
    //setup aaccounts
    [deployer,buyer] = await ethers.getSigners();
    // console.log(deployer.address, buyer.address)

    //deploy contract
    const Medicine = await ethers.getContractFactory("Medicine");
    medicine = await Medicine.deploy();
    // await medicine.deployed();
  })



  describe("Deployment", () => {
    it("Sets the owner", async() => {
      expect(await medicine.owner()).to.equal(deployer.address)
    })

    // it('has a name',async() => {
    //   expect(await medicine.name()).to.equal('Pharma Nexus')
    // })
  })
 
})
