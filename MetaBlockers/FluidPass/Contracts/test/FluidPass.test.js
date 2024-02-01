const { expect } = require("chai");
const { ethers } = require("hardhat");

// Import the ABI and address of the fdai contract
const fdaiABI = require("../artifacts/contracts/IFakeDAI.sol/IFakeDAI.json");
const fdaiAddress = "0x15F0Ca26781C3852f8166eD2ebce5D18265cceb7"; 

describe("FluidPass Contract", function () {
  let FluidPass;
  let fluidPass;
  let owner;
  let organizer;
  let user;
  let fdai;

  before(async function () {
    [owner, organizer, user] = await ethers.getSigners();

    FluidPass = await ethers.getContractFactory("FluidPass");
    fluidPass = await FluidPass.deploy();
    await fluidPass.deployed();

    // Create an instance of the fdai contract
    fdai = new ethers.Contract(fdaiAddress, fdaiABI.abi, owner);
  });

  it("should allow adding an organizer", async function () {
    await fluidPass.connect(owner).addOrganizer(organizer.address);
    expect(await fluidPass.isOrganizer(organizer.address)).to.equal(true);
  });

  it("should allow the organizer to create an event", async function () {
    const eventName = "Test Event";
    const endTime = 172800; // 2 days
    const pricePerTicket = ethers.utils.parseEther("0.01");
    const totalTickets = 100;

    await fluidPass.connect(organizer).createEvent(eventName, endTime, pricePerTicket, totalTickets);

    const event = await fluidPass.getEventDetails(eventName);
    // console.log(event)
    expect(event.organizer).to.equal(organizer.address);
    expect(event.pricePerTicket.toString()).to.equal(pricePerTicket.toString());
    expect(event.totalTicketBooked.toString()).to.equal("0");
    expect(event.totalTickets.toString()).to.equal(totalTickets.toString());
    expect(parseInt(event.endTime.toString())).to.be.gt(0);
  });

  it("should allow a user to join the event", async function () {
    const eventName = "Test Event";
    const event = await fluidPass.getEventDetails(eventName);
    const amount = event.pricePerTicket.toString();
    fdai = new ethers.Contract(fdaiAddress, fdaiABI, user);
    
    fdai.approve(fluidPass.address, amount)
    await fluidPass.connect(user).joinEvent(eventName);

    expect(event.totalTicketBooked).to.equal(1);
    expect(event.users[0]).to.equal(user.address);
  });

  it("should allow a user to leave the event", async function () {
    const eventName = "Test Event";
    await fluidPass.connect(user).leaveEvent(eventName);

    const event = await fluidPass.Events(ethers.utils.formatBytes32String(eventName));
    expect(event.totalTicketBooked).to.equal(0);
    expect(event.users.length).to.equal(0);
  });

  // Add more test cases as needed for other functions in your contract

  it("should allow the organizer to withdraw funds", async function () {
    const eventName = "Test Event";
    await fluidPass.connect(organizer).withdrawFunds(eventName);

    // Add assertions for the expected state after funds withdrawal
  });
});
