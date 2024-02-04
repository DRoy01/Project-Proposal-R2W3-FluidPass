    //SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.14;

import {
    ISuperfluid,
    ISuperToken,
    ISuperApp
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import {SuperTokenV1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";
import {IFakeDAI} from "./IFakeDAI.sol";


contract FluidPass is Ownable {
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
        uint256 endTime;
    }

    mapping(bytes => Event) public Events;
    mapping(address => bool) public isOrganizer;
    mapping(bytes => mapping(address => uint256)) public userBookingId;

    address public owner;

    event EventEnded(uint256 totalFunds);
    event JoinedEvent(address indexed addr, string eventName, uint bookingId);
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner!");
        _;
    }

    modifier onlyEventOrganizer() {
        require(isOrganizer[msg.sender], "Only event organizer can call this");
        _;
    }

    modifier eventNotEnded() {
        require(!eventEnded, "Event has already ended");
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

    function createEvent(string calldata _eventName, uint256 _endTime, uint _pricePerTicket) public onlyEventOrganizer {
        require(bytes(_eventName).length > 0, "Invalid input");
        Events[bytes(_eventName)] = new Event(msg.sender, _pricePerTicket, 0, block.timestamp + _endTime);
    }

    function joinEvent(string calldata _eventName) public {
        require(bytes(_eventName).length > 0, "Invalid input");
        require(Events[bytes(_eventName)].endTime > block.timestamp, "Event ended!");
        wrapTofDAIx(msg.sender, Events[bytes(_eventName)].pricePerTicket);
        Events[bytes(_eventName)].totalTicketBooked += 1;
        userBookingId[bytes(_eventName)][msg.sender] = Events[bytes(_eventName)].totalTicketBooked;
        uint amount = Events[bytes(_eventName)].pricePerTicket;
        uint time = Events[bytes(_eventName)].endTime;
        uint weiPerSecond = amount / time;
        emit JoinedEvent(msg.sender, _eventName, Events[bytes(_eventName)].totalTicketBooked);
        _createFlowIntoContract(int96(weiPerSecond));
    }

  function leaveEvent(string calldata _eventName) public {
        require(bytes(_eventName).length > 0, "Invalid input");
        require(userBookingId[bytes(_eventName)][msg.sender] > 0, "Not Joined");
        // require(Events[bytes(_eventName)].endTime < block.timestamp || Events[bytes(_eventName)].endTime > block.timestamp, "Invalid");
        
        _deleteFlowIntoContract();
    }

    function _createFlowIntoContract(int96 flowRate) private {
        fDAIx.createFlowFrom(msg.sender, address(this), flowRate);
    }

    function _deleteFlowIntoContract() private {
        fDAIx.deleteFlow(msg.sender, address(this));
    }

    function withdrawFunds(string calldata _eventName) public onlyEventOrganizer{
        require(block.timestamp > Events[bytes(_eventName)].endTime, "Event not ended");
        require(bytes(_eventName).length > 0, "Invalid input");
        fDAIx.transfer(msg.sender, amount);
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
