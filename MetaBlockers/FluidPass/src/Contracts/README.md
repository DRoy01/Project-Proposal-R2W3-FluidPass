# FluidPass Smart Contract

## Overview

FluidPass is a decentralized application (DApp) smart contract implemented in Solidity on the Ethereum blockchain. The contract facilitates the creation and management of events where participants can join by purchasing tickets using Superfluid-compatible tokens (fDAIx). The contract allows event organizers to withdraw funds collected from ticket sales after the event has ended.

## Features

1. **Event Creation**: Event organizers can create events by specifying the event name, duration, and price per ticket.

2. **User Participation**: Participants can join events by purchasing tickets using Superfluid-compatible tokens. The contract automatically calculates and manages the flow of funds into the contract during the event.

3. **Organizer Management**: The contract includes functionality to add organizers and restrict certain operations to only the designated event organizers.

4. **Token Wrapping and Unwrapping**: The contract facilitates the wrapping of Superfluid-compatible tokens (fDAI) into SuperTokens (fDAIx) for seamless handling of token transfers.

5. **Event Withdrawal**: After an event has ended, the event organizer can withdraw the funds collected from ticket sales.

## Smart Contract Structure

The smart contract consists of the following main components:

- **Event Struct**: Represents an event with details such as the organizer's address, price per ticket, total tickets booked, and event end time.

- **Event Mapping**: Maps event names to their corresponding Event structs.

- **Organizer Management**: Tracks organizers and allows the addition of new organizers.

- **Event Participation**: Functions for participants to join and leave events, with corresponding Superfluid flows.

- **Token Wrapping/Unwrapping**: Functions for wrapping Superfluid-compatible tokens into SuperTokens (fDAIx) and unwrapping them back.

- **Event Withdrawal**: Functionality for event organizers to withdraw funds after the event has ended.

## Usage

1. **Deploy Contract**: Deploy the contract to the Ethereum blockchain.

2. **Add Organizers**: The contract owner can add organizers using the `addOrganizer` function.

3. **Create Events**: Organizers can create events using the `createEvent` function, specifying the event name, duration, and price per ticket.

4. **User Participation**: Participants can join events using the `joinEvent` function, purchasing tickets with Superfluid-compatible tokens.

5. **Event Withdrawal**: After an event has ended, organizers can withdraw funds using the `withdrawFunds` function.

6. **Token Management**: Users can wrap and unwrap Superfluid-compatible tokens using the `wrapTofDAIx` and `unWrapTofDAI` functions.

To get started with the updated version:

1. Install dependencies with specific commands:
    
    * `forge install superfluid-protocol-monorepo=https://github.com/superfluid-finance/protocol-monorepo@dev --no-commit`
    * `forge install https://github.com/OpenZeppelin/openzeppelin-contracts@v4.9.3 --no-commit`
2. Compile the contracts with `forge build`.
    
3. Run the test suite with `forge test`.

## Disclaimer

This smart contract is provided as-is without any warranties. Users are encouraged to review the code and understand its implications before interacting with the contract on the Ethereum blockchain. The SPDX-License-Identifier is set to Unlicense, indicating that the contract is released into the public domain with no restrictions.


