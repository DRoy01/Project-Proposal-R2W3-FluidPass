import React, { useState, useEffect } from "react";
import { Framework } from "@superfluid-finance/sdk-core";
// import {
//   Button,
//   Form,
//   FormGroup,
//   FormControl,
//   Spinner,
//   Card
// } from "react-bootstrap";
// import "./createFlow.css";
import { ethers } from "ethers";

let account;

//where the Superfluid logic takes place
export default async function createFlow() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);

  const signer = provider.getSigner();

  const chainId = await window.ethereum.request({ method: "eth_chainId" });
  const sf = await Framework.create({
    chainId: Number(chainId),
    provider: provider
  });

  const superSigner = sf.createSigner({ signer: signer });

  // console.log(signer);
  // console.log(await superSigner.getAddress());
  const daix = await sf.loadSuperToken("fDAIx");

  // console.log(daix);

  try {
    const createFlowOperation = daix.createFlow({
      sender: await superSigner.getAddress(),
      receiver: "0x03905E154e6F499F99DDa452502aDfbC4842aD4F",
      flowRate: 10000
      // userData?: string
    });

    // console.log(createFlowOperation);
    // console.log("Creating your stream...");

    const result = await createFlowOperation.exec(superSigner);
    // console.log(result);

    // console.log(`Congrats - you've just created a money stream!`);
    let sender = await superSigner.getAddress()
    // let gasReceiver = "0x03905E154e6F499F99DDa452502aDfbC4842aD4F";
    // console.log(`https://console.superfluid.finance/mumbai/streams/${sender}-${gasReceiver}-0x5d8b4c2554aeb7e86f387b4d6c00ac33499ed01f-8.0`);
    // console.log(`https://console.superfluid.finance/goerli/accounts/${sender}?tab=tokens`)
    // console.log(`https://console.superfluid.finance/goerli/accounts/${sender}?tab=tokens`)



    return true;
  } catch (error) {
    // console.log(
    //   "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
    // );
    console.error(error);
    return false;
  }
}

// export const CreateFlow = () => {
//   const [recipient, setRecipient] = useState("");
//   const [isButtonLoading, setIsButtonLoading] = useState(false);
//   const [flowRate, setFlowRate] = useState("");
//   const [flowRateDisplay, setFlowRateDisplay] = useState("");
//   const [currentAccount, setCurrentAccount] = useState("");

//   const connectWallet = async () => {
//     try {
//       const { ethereum } = window;

//       if (!ethereum) {
//         alert("Get MetaMask!");
//         return;
//       }
//       const accounts = await ethereum.request({
//         method: "eth_requestAccounts"
//       });
//       console.log("Connected", accounts[0]);
//       setCurrentAccount(accounts[0]);
//       account = currentAccount;
//       // Setup listener! This is for the case where a user comes to our site
//       // and connected their wallet for the first time.
//       // setupEventListener()
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const checkIfWalletIsConnected = async () => {
//     console.log("runs");
//     const { ethereum } = window;

//     if (!ethereum) {
//       console.log("Make sure you have metamask!");
//       return;
//     } else {
//       console.log("We have the ethereum object", ethereum);
//     }

//     const accounts = await window.ethereum.request({ method: "eth_accounts" });
//     const chain = await window.ethereum.request({ method: "eth_chainId" });
//     let chainId = chain;
//     console.log("chain ID:", chain);
//     console.log("global Chain Id:", chainId);
//     if (accounts.length !== 0) {
//       account = accounts[0];
//       console.log("Found an authorized account:", account);
//       setCurrentAccount(account);
//       // Setup listener! This is for the case where a user comes to our site
//       // and ALREADY had their wallet connected + authorized.
//       // setupEventListener()
//     } else {
//       console.log("No authorized account found");
//     }
//   };

//   useEffect(() => {
//     checkIfWalletIsConnected();
//   }, []);

//   function calculateFlowRate(amount) {
//     if (typeof Number(amount) !== "number" || isNaN(Number(amount)) === true) {
//       alert("You can only calculate a flowRate based on a number");
//       return;
//     } else if (typeof Number(amount) === "number") {
//       if (Number(amount) === 0) {
//         return 0;
//       }
//       const amountInWei = ethers.BigNumber.from(amount);
//       const monthlyAmount = ethers.utils.formatEther(amountInWei.toString());
//       const calculatedFlowRate = monthlyAmount * 3600 * 24 * 30;
//       return calculatedFlowRate;
//     }
//   }

//   function CreateButton({ isLoading, children, ...props }) {
//     return (
//       <Button variant="success" className="button" {...props}>
//         {isButtonLoading ? <Spinner animation="border" /> : children}
//       </Button>
//     );
//   }

//   const handleRecipientChange = (e) => {
//     setRecipient(() => ([e.target.name] = e.target.value));
//   };

//   const handleFlowRateChange = (e) => {
//     setFlowRate(() => ([e.target.name] = e.target.value));
//     let newFlowRateDisplay = calculateFlowRate(e.target.value);
//     setFlowRateDisplay(newFlowRateDisplay.toString());
//   };

//   return (
//     <div>
//       <h2>Create a Flow</h2>
//       {currentAccount === "" ? (
//         <button id="connectWallet" className="button" onClick={connectWallet}>
//           Connect Wallet
//         </button>
//       ) : (
//         <Card className="connectedWallet">
//           {`${currentAccount.substring(0, 4)}...${currentAccount.substring(
//             38
//           )}`}
//         </Card>
//       )}
//       <Form>
//         <FormGroup className="mb-3">
//           <FormControl
//             name="flowRate"
//             value={flowRate}
//             onChange={handleFlowRateChange}
//             placeholder="Enter a flowRate in wei/second"
//           ></FormControl>
//         </FormGroup>
//         <CreateButton
//           onClick={() => {
//             setIsButtonLoading(true);
//             createNewFlow(recipient, flowRate);
//             setTimeout(() => {
//               setIsButtonLoading(false);
//             }, 1000);
//           }}
//         >
//           Click to Create Your Stream
//         </CreateButton>
//       </Form>

//       <div className="description">
//         <p>
//           Go to the CreateFlow.js component and look at the <b>createFlow() </b>
//           function to see under the hood
//         </p>
//         <div className="calculation">
//           <p>Your flow will be equal to:</p>
//           <p>
//             <b>${flowRateDisplay !== " " ? flowRateDisplay : 0}</b> DAIx/month
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };
