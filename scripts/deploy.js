const {ethers, run, network} = require("hardhat")
//run allows us to run any hardhat task

async function main(){
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Deploy....")
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()
  console.log("Contract Address : ",simpleStorage.address)
  //checking which network we are running on : 
  console.log(network.config)
  if(network.config.chainId == 4 && process.env.ETHERSCAN_API_KEY)
  {
    console.log("Waiting for some blocks to be mined")
    await simpleStorage.deployTransaction.wait(2)//waiting for some blocks to get attached to the chain, as etherscan will need some time to be upto date with our tx
    console.log("Verifying now...")
    await verify(simpleStorage.address,[])
  }
  else{
    console.log("Not on Rikeby Chain")
  }
  const currentValue = await simpleStorage.retrieve()
  console.log("Current Value :", currentValue)
  const txResponse = await simpleStorage.store(10)
  await txResponse.wait(1)//waiting for a block to be added 
  const updatedValue = await simpleStorage.retrieve()
  console.log("Updated Value : ", updatedValue)
}

async function verify(contractAddress, args)
{
  console.log("verifying contract...")
  try{
    await run("verify:verify",{
      address : contractAddress,
      constructorArguments: args
    })  
  }
  catch(e){
    if(e.message.toLowerCase().includes("already verified"))
      console.log("Already verified!")
    else 
      console.log("Error : ",e)
  }
}
main().then(()=>process.exit(0)).catch((er)=>{console.log("Error :",er);process.exit(1)})