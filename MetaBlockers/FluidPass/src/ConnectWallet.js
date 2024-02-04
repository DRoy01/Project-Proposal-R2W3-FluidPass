import { ethers } from "ethers";

const connectWallet = async () => {
    try {
      if (window.ethereum) {
        // console.log("MetaMask is available");
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // MetaMask requires requesting permission to connect users' accounts
        await window.ethereum.request({ method: "eth_requestAccounts" });

        // console.log("Connected to MetaMask");
        return true
        // Additional logic after successful connection, if needed
      } else {
        // console.log("MetaMask not found. Please install MetaMask.");
        return false;
        // Handle the case where MetaMask is not available
      }
    } catch (error) {
      // console.error("Error connecting to MetaMask:", error);
      // Handle errors, e.g., user rejection or other issues
    }
  };

export default connectWallet;