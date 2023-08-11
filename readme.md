# Decentralized Escrow Application

This is an Escrow Dapp built with [Hardhat](https://hardhat.org/  however, web app does not use Hardhat). In here you can create and deploy instances of an Escrow contract, giving arbiter and beneficiary addresses, the owner will be the one currently connected to the wallet. Can be connected to any network, testnet or mainnet, compatible with the EVM, I used Sepolia. Some test coins are needed, which can be obtained from a faucet (e.g. sepoliafaucet.com).

## Project Layout

There are three top-level folders:

1. `/app` - contains the front-end application
2. `/contracts` - contains the solidity contract
3. `/tests` - contains tests for the solidity contract

## Setup

Install dependencies in the top-level directory with `npm install`.

After you have installed hardhat locally, you can use commands to test and compile the contracts, among other things. To learn more about these commands run `npx hardhat help`.

Compile the contracts using `npx hardhat compile`. The artifacts will be placed in the `/app` folder, which will make it available to the front-end. This path configuration can be found in the `hardhat.config.js` file.

## Front-End

`cd` into the `/app` directory and run `npm install`

To run the front-end application run `npm start` from the `/app` directory. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

