import { ethers } from 'ethers';

// Function to connect the wallet
export async function connectWallet() {
  try {
    // Prompt user to connect their MetaMask wallet
    await ethereum.request({ method: 'eth_requestAccounts' });

    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
      // Display success message on the frontend
      displaySuccessMessage('Wallet Connected Successfully!');
      
      // Now that the wallet is connected, you can perform further initialization or actions
      console.log('Wallet connected successfully!');
    } else {
      throw new Error('MetaMask is not installed.');
    }
  } catch (error) {
    // Handle error
    console.error('Error connecting wallet:', error.message);
    
    // Display error message on the frontend
    displayErrorMessage('Metamask Wallet Not Found!');
  }
}

// Function to display success message on the frontend
function displaySuccessMessage(message) {
  const successMessageContainer = document.getElementById('successMessageContainer');

  if (successMessageContainer) {
    successMessageContainer.innerHTML = `<p style="color: green;">${message}</p>`;
  }
}

// Function to display error message on the frontend
function displayErrorMessage(message) {
  const errorMessageContainer = document.getElementById('errorMessageContainer');

  if (errorMessageContainer) {
    errorMessageContainer.innerHTML = `<p style="color: red;">${message}</p>`;
  }
}


