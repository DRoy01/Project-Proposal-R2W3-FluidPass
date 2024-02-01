    //SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.14;

import {
    ISuperfluid,
    ISuperToken,
    ISuperApp
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import {SuperTokenV1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";
import {IFakeDAI} from "./IFakeDAI.sol";

contract FluidPass {
    // ---------------------------------------------------------------------------------------------
    // STATE VARS
    /// @notice CFA Library.
    using SuperTokenV1Library for ISuperToken;

    ISuperfluid superfluid;
    ISuperToken fDAIx = ISuperToken(0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f);

    struct Event {
        address organizer;
        uint256 pricePerTicket;
        uint256 totalTicketBooked;
        uint256 totalTickets;
        uint256 endTime;
        address[] users;
    }

    mapping(bytes => Event) public Events;
    mapping(address => bool) public isOrganizer;
    mapping(bytes => mapping(address => uint256)) public userBookingId;
    mapping(bytes => mapping(address => uint256)) public timeSpentByUser;

    address public owner;

    event EventEnded(uint256 totalFunds);
    event JoinedEvent(address indexed addr, string eventName, uint256 bookingId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner!");
        _;
    }

    modifier onlyEventOrganizer() {
        require(isOrganizer[msg.sender], "Only event organizer can call this");
        _;
    }

    constructor() {
        // superfluid = ISuperfluid(_superfluid);
        owner = msg.sender;
    }

    function addOrganizer(address _organizer) public onlyOwner {
        require(_organizer != address(0), "Invalid address");
        require(!isOrganizer[_organizer], "Already an organizer");
        isOrganizer[_organizer] = true;
    }

    function createEvent(string calldata _eventName, uint256 _endTime, uint256 _pricePerTicket, uint256 _totalTickets)
        public
        onlyEventOrganizer
    {
        require(bytes(_eventName).length > 0, "Invalid input");
        Events[bytes(_eventName)] = Event({
        organizer: msg.sender,
        pricePerTicket: _pricePerTicket,
        totalTicketBooked: 0,
        totalTickets: _totalTickets,
        endTime: block.timestamp + _endTime,
        users: new address[](0) // Initialize an empty dynamic array of addresses
    });
    }

    function getEventDetails (string calldata _eventName) public view returns (Event memory) {
        return Events[bytes(_eventName)];
    }

    function joinEvent(string calldata _eventName) public {
        require(bytes(_eventName).length > 0, "Invalid input");
        require(
            Events[bytes(_eventName)].totalTicketBooked <= Events[bytes(_eventName)].totalTickets,
            "No Tickets Available"
        );
        require(Events[bytes(_eventName)].endTime > block.timestamp, "Event ended!");
        wrapTofDAIx(msg.sender, Events[bytes(_eventName)].pricePerTicket);
        Events[bytes(_eventName)].totalTicketBooked += 1;
        Events[bytes(_eventName)].users.push(msg.sender);
        userBookingId[bytes(_eventName)][msg.sender] = Events[bytes(_eventName)].totalTicketBooked;
        uint256 amount = Events[bytes(_eventName)].pricePerTicket;
        uint256 time = Events[bytes(_eventName)].endTime;
        uint96 weiPerSecond = uint96(amount / time);
        emit JoinedEvent(msg.sender, _eventName, Events[bytes(_eventName)].totalTicketBooked);
        _createFlowIntoContract(int96(weiPerSecond));
    }

    function leaveEvent(string calldata _eventName) public {
        require(bytes(_eventName).length > 0, "Invalid input");
        require(userBookingId[bytes(_eventName)][msg.sender] > 0, "Not Joined");

        uint256 userIndex = type(uint256).max; // Initialize with a value not reachable in a valid array index

        for (uint256 i = 0; i < Events[bytes(_eventName)].users.length; ++i) {
            if (Events[bytes(_eventName)].users[i] == msg.sender) {
                userIndex = i;
                break;
            }
        }

        require(userIndex < Events[bytes(_eventName)].users.length, "User not found in the event");

        // Swap the user to remove with the last user in the array
        address lastUser = Events[bytes(_eventName)].users[Events[bytes(_eventName)].users.length - 1];
        Events[bytes(_eventName)].users[userIndex] = lastUser;

        // Remove the last user from the array
        Events[bytes(_eventName)].users.pop();
        timeSpentByUser[bytes(_eventName)][msg.sender] = block.timestamp;
        _deleteFlowIntoContract();
    }

    function _createFlowIntoContract(int96 flowRate) private {
        fDAIx.createFlowFrom(msg.sender, address(this), flowRate);
    }

    function _deleteFlowIntoContract() private {
        fDAIx.deleteFlow(msg.sender, address(this));
    }

    function withdrawFunds(string calldata _eventName) public onlyEventOrganizer {
        require(block.timestamp > Events[bytes(_eventName)].endTime, "Event not ended");
        require(Events[bytes(_eventName)].organizer == msg.sender, "Not the organizer");
        require(bytes(_eventName).length > 0, "Invalid input");
        uint256 totalFunds = 0;
        for (uint256 i = 0; i < Events[bytes(_eventName)].users.length; ++i) {
            address user = Events[bytes(_eventName)].users[i];
            uint256 timespent = timeSpentByUser[bytes(_eventName)][user];
            uint256 amount = Events[bytes(_eventName)].pricePerTicket;
            uint256 time = Events[bytes(_eventName)].endTime;
            uint256 weiPerSecond = amount / time;
            totalFunds += (timespent * weiPerSecond);
        }
        fDAIx.transfer(msg.sender, totalFunds);
    }

    function wrapTofDAIx(address receiverAddress, uint256 _amount) public {
        // Get address of fDAI by getting underlying token address from DAIx token
        IFakeDAI fDAI = IFakeDAI(fDAIx.getUnderlyingToken());

        require(fDAI.balanceOf(msg.sender) >= _amount, "Insufficient balance");

        require(fDAI.allowance(msg.sender, address(this)) >= _amount, "Insufficient allowance");

        fDAI.transferFrom(msg.sender, address(this), _amount);
        // Approve fDAIx contract to spend fDAI
        fDAI.approve(address(fDAIx), _amount);

        // Wrap the fDAI into fDAIx
        fDAIx.upgradeTo(receiverAddress, _amount, "0x");
    }

    function unWrapTofDAI(uint256 _amount) public {
        fDAIx.downgrade(_amount);

        IFakeDAI fDAI = IFakeDAI(fDAIx.getUnderlyingToken());

        require(fDAI.balanceOf(address(this)) >= _amount, "Insufficient balance");

        fDAI.transfer(msg.sender, _amount);
    }
}
