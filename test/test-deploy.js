const {ethers} = require('hardhat')
const {expect, assert} = require('chai')


describe("SimpleStorage", 
  function(){
    let simpleStorage, simpleStorageFactory
    beforeEach(async function(){ //this means before each 'it' first do what's inside this for ex - deploy the contract
      simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
      simpleStorage =  await simpleStorageFactory.deploy()
    }) 

    it("At the start the favorite no. should be = 0", async function(){
      const currentValue = await simpleStorage.retrieve()
      let expectedValue = 0
      assert.equal(currentValue.toString(), expectedValue)
    })//Test 1

    it("Should update when we call store.", async function(){
      const currentValue = await simpleStorage.retrieve()
      let value = 10
      await simpleStorage.store(value)
      const newValue = await simpleStorage.retrieve()
      assert.equal(newValue.toString(), value)
    })


  }
)