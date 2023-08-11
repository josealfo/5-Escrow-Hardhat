import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import deploy from './deploy';
import Escrow from './Escrow';


const provider = new ethers.providers.Web3Provider(window.ethereum);

export async function approve(escrowContract, signer) {
  const approveTxn = await escrowContract.connect(signer).approve();
  await approveTxn.wait();
}

function App() {
  const [escrows, setEscrows] = useState([]);
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();

  useEffect(() => {
    async function getAccounts() {
      const accounts = await provider.send('eth_requestAccounts', []);

      setAccount(accounts[0]);
      setSigner(provider.getSigner());
    }

    getAccounts();
  }, [account]);


  async function newContract() {
    console.log("Entered newContract");
    const beneficiary = document.getElementById('beneficiary').value;
    const arbiter = document.getElementById('arbiter').value;
//    const value = ethers.BigNumber.from(document.getElementById('wei').value);
    const value = ethers.utils.parseEther(document.getElementById('wei').value);
    const escrowContract = await deploy(signer, arbiter, beneficiary, value);

    const escrow = {
      address: escrowContract.address,
      arbiter,
      beneficiary,
      value: value.toString(),
      isApproved: false,
      handleApprove: async () => {
        escrowContract.on('Approved', () => {
          document.getElementById(escrowContract.address).className =
            'complete';
          document.getElementById(escrowContract.address).innerText =
            "✓ It's been approved!";
        });

        await approve(escrowContract, signer);
      },
    };

    console.log("newContract:setting escrows state variable", escrows, escrow)
    setEscrows([...escrows, escrow]);
  }

  async function loadExistingEscrowContract(){   
    
    const adr = document.getElementById('existingScrowContractAddress').value
    const abi = [{"inputs":[{"internalType":"address","name":"_arbiter","type":"address"},{"internalType":"address","name":"_beneficiary","type":"address"}],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"Approved","type":"event"},{"inputs":[],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"arbiter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"beneficiary","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"depositor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isApproved","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]
    let escrowContract = new ethers.Contract(adr, abi, provider);
    /* 
    //provider is a global variable defined at the beginning of this file

    console.log('loadExistingEscrowContract address is', adr);
    console.log('loadExistingEscrowContract abi is', abi);
    console.log('provider=', provider);
    console.log('ESCROW CONTRACT:');     
    console.log('address=', adr);     
    console.log('arbiter', await escrowContract.arbiter());
    console.log('beneficiary', await escrowContract.beneficiary()); 
    console.log('value', (await provider.getBalance(adr)).toString()); 
    */
    console.log('isApproved', await escrowContract.isApproved());

    const escrow = {
        address: adr,
        arbiter: await escrowContract.arbiter(),
        beneficiary: await escrowContract.beneficiary(),
        value: (await provider.getBalance(adr)).toString(), 
        isApproved: await escrowContract.isApproved(), 
        handleApprove: async () => {
          escrowContract.on('Approved', () => {
            document.getElementById(escrowContract.address).className =
              'complete';
            document.getElementById(escrowContract.address).innerText =
              "✓ It's been approved!";
          });
          if(!(await escrowContract.isApproved())) { 
            await approve(escrowContract, signer);
          }
        },
      };

      setEscrows([...escrows, escrow]);
  }

  function validateEther() { 
    try {
      ethers.utils.parseEther(document.getElementById('wei').value);
      return true; 
    } catch (e) { 
      return false; 
    }
  }

  return (
    <>
      <div className="new-escrow-contract">
        <h1> New Escrow Contract </h1>
        <label>
          Arbiter Address
          <input type="text" id="arbiter" />
        </label>

        <label>
          Beneficiary Address
          <input type="text" id="beneficiary" />
        </label>

        <label>
          Deposit Amount (in Eth)
          <input type="text" id="wei" />
        </label>

        <div
          className="button"
          id="deploy"
          onClick={(e) => {
            e.preventDefault();
            if(validateEther()) {
              newContract();  
            } else {
              alert ('Amount missunderstanded');
            }
          }}
        >
          Deploy
        </div>
        <div className="secondOptionSeparator">or</div>
         <label>
          Existing Escrow Contract
          <input type="text" id="existingScrowContractAddress" placeholder="Address of the deployed smart contract"/>
        </label>

        <div
          className="button"
          id="search"
          onClick={(e) => {
            e.preventDefault();
            loadExistingEscrowContract();
          }}
        >
          Search
        </div>
      </div>
      <div className="contract-details">
        <h1> Details </h1>

        <div id="container">
          {escrows.map((escrow) => {
            return <Escrow key={escrow.address} isApproved={escrow.isApproved} {...escrow} />;
          })}
        </div>
      </div>
    </>
  );
}

export default App;
