require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config()
require("./tasks/block-number")
require("hardhat-gas-reporter")
require("solidity-coverage")

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL 
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

module.exports = {
  //if not specified explicitly, hardhat automatically adds the below line, basically it provides a defaul rpc url and private key
  //defaultNetwork : "hardhat"
  networks:{
    rinkeby:{
      url : RINKEBY_RPC_URL,
      accounts : [PRIVATE_KEY],
      chainId : 4
    },
    localhose:{
      url : "http://127.0.0.1:8545/",
      //hardhat automatically places one the hardhat node accounts
      chainId : 31337 
    }
  },
  solidity: "0.8.16",
  etherscan:{
    apiKey : ETHERSCAN_API_KEY,
  },
  // gasReporter: {
  //   enabled: true,
  //   outputFile:"gas-report.txt",
  //   noColors : true,
  //   currency : "USD",
  //   // coinmarketcap : cmc's api key
  // }
};

