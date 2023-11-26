
const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

//global const for listing an item
const ID = 1;
const NAME = "Paracetamol";
const CATEGORY = "Antibiotics";
const IMAGE = "https://www.orionlifes.com/wp-content/uploads/2022/04/brexodol-tab-1024x768.jpeg";
const COST = tokens(1);
const RATING = 4;
const STOCK = 5;


describe("Medicine", () => {
  let medicine;
  let deployer, buyer;

  beforeEach(async () => {
    //setup aaccounts
    [deployer, buyer] = await ethers.getSigners();
    // console.log(deployer.address, buyer.address)

    //deploy contract
    const Medicine = await ethers.getContractFactory("Medicine");
    medicine = await Medicine.deploy();
    // await medicine.deployed();
  })



  describe("Deployment", () => {
    it("Sets the owner", async () => {
      expect(await medicine.owner()).to.equal(deployer.address)
    })

    // it('has a name',async() => {
    //   expect(await medicine.name()).to.equal('Pharma Nexus')
    // })
  })

  describe("Listing", () => {
    let transaction;

    beforeEach(async () => {
      transaction = await medicine.connect(deployer).list(
        ID,
        NAME,
        CATEGORY,
        IMAGE,
        COST,
        RATING,
        STOCK
      )
      await transaction.wait();
    })

    it("Returns item attributes", async () => {
      const item = await medicine.items(ID)
      expect(item.id).to.equal(ID)
      expect(item.name).to.equal(NAME)
      expect(item.category).to.equal(CATEGORY)
      expect(item.image).to.equal(IMAGE)
      expect(item.cost).to.equal(COST)
      expect(item.rating).to.equal(RATING)
      expect(item.stock).to.equal(STOCK)
    })
    it("Emits list event", () => {
      expect(transaction).to.emit(medicine, 'list')
    })
  })

  describe("Buying", () => {
    let transaction;

    //list an item
    beforeEach(async () => {
      transaction = await medicine.connect(deployer).list(
        ID,
        NAME,
        CATEGORY,
        IMAGE,
        COST,
        RATING,
        STOCK
      )
      await transaction.wait();

      //buy an item
      transaction = await medicine.connect(buyer).buy(ID, { value: COST });

    })


    it("Updates the contract balance", async () => {
      const result = await ethers.provider.getBalance(medicine.address)
      console.log(result)
      expect(result).to.equal(COST)
    })

    it("Updates buyer's order count", async () => {
      const result = await medicine.orderCount(buyer.address);
      expect(result).to.equal(1)
    })

    it("Adds the order", async () => {
      const order = await medicine.orders(buyer.address, 1);
      expect(order.time).to.be.greaterThan(0);
      expect(order.item.name).to.equal(NAME);
    })

    it("Updates the contract balance", async () => {
      const result = await ethers.provider.getBalance(medicine.address)
      expect(result).to.equal(COST)
    })

    it("Emits buy event", () => {
      expect(transaction).to.emit(medicine, 'Buy')
    })
  })

  describe("Withdrawing", () => {
    let balanceBefore

    beforeEach(async () => {
      // list medicine
      let transaction = await medicine.connect(deployer).list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK)
      await transaction.wait()

      //buy medicine
      transaction = await medicine.connect(buyer).buy(ID, { value: COST })
      await transaction.wait()

      // get deployer's balance
      balanceBefore = await ethers.provider.getBalance(deployer.address)

      //withdraw
      transaction = await medicine.connect(deployer).withdraw()
      await transaction.wait()
    })

    it('Updates the owner balance', async () => {
      const balanceAfter = await ethers.provider.getBalance(deployer.address)
      expect(balanceAfter).to.be.greaterThan(balanceBefore)
    })

    it('Updates the contract balance', async () => {
      const result = await ethers.provider.getBalance(medicine.address)
      expect(result).to.equal(0)
    })
  })
})




