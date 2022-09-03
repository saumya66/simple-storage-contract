const {task} = require('hardhat/config')

//Tasks are good for plugins
task("block-number","Prints the current block number").setAction(
    async(taskArgs, hre)=>{ //hre means hardhat runtime env, it's same as require("hardhat")
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log("Current block number", blockNumber)

    }
)

module.exports = {}