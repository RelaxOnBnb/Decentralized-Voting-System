const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VotingSystem", function () {
  let VotingSystem;
  let votingSystem;
  let owner;
  let voter1;
  let voter2;

  beforeEach(async function () {
    [owner, voter1, voter2] = await ethers.getSigners();
    
    VotingSystem = await ethers.getContractFactory("VotingSystem");
    votingSystem = await VotingSystem.deploy();
    await votingSystem.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right admin", async function () {
      expect(await votingSystem.admin()).to.equal(owner.address);
    });

    it("Should start with voting closed", async function () {
      expect(await votingSystem.votingOpen()).to.equal(false);
    });
  });

  describe("Voter Registration", function () {
    it("Should allow admin to register voters", async function () {
      await votingSystem.registerVoter(voter1.address);
      const voter = await votingSystem.voters(voter1.address);
      expect(voter.isRegistered).to.equal(true);
    });

    it("Should not allow non-admin to register voters", async function () {
      await expect(
        votingSystem.connect(voter1).registerVoter(voter2.address)
      ).to.be.revertedWith("Only admin can perform this action");
    });

    it("Should not allow registering the same voter twice", async function () {
      await votingSystem.registerVoter(voter1.address);
      await expect(
        votingSystem.registerVoter(voter1.address)
      ).to.be.revertedWith("Voter already registered");
    });
  });

  describe("Candidate Management", function () {
    it("Should allow admin to add candidates", async function () {
      await votingSystem.addCandidate("Candidate 1", "Description 1");
      expect(await votingSystem.getCandidateCount()).to.equal(1);
    });

    it("Should not allow adding candidates when voting is open", async function () {
      await votingSystem.addCandidate("Candidate 1", "Description 1");
      await votingSystem.startVoting(60); // 60 minutes duration
      
      await expect(
        votingSystem.addCandidate("Candidate 2", "Description 2")
      ).to.be.revertedWith("Cannot add candidate while voting is open");
    });
  });

  describe("Voting Process", function () {
    beforeEach(async function () {
      await votingSystem.addCandidate("Candidate 1", "Description 1");
      await votingSystem.addCandidate("Candidate 2", "Description 2");
      await votingSystem.registerVoter(voter1.address);
    });

    it("Should allow registered voters to cast votes", async function () {
      await votingSystem.startVoting(60);
      await votingSystem.connect(voter1).castVote(0);
      
      const voter = await votingSystem.voters(voter1.address);
      expect(voter.hasVoted).to.equal(true);
      expect(voter.votedFor).to.equal(0);
    });

    it("Should not allow voting before voting starts", async function () {
      await expect(
        votingSystem.connect(voter1).castVote(0)
      ).to.be.revertedWith("Voting is not open");
    });

    it("Should not allow voting twice", async function () {
      await votingSystem.startVoting(60);
      await votingSystem.connect(voter1).castVote(0);
      
      await expect(
        votingSystem.connect(voter1).castVote(1)
      ).to.be.revertedWith("Voter has already voted");
    });

    it("Should not allow voting for invalid candidate", async function () {
      await votingSystem.startVoting(60);
      await expect(
        votingSystem.connect(voter1).castVote(99)
      ).to.be.revertedWith("Invalid candidate ID");
    });
  });

  describe("Results", function () {
    beforeEach(async function () {
      await votingSystem.addCandidate("Candidate 1", "Description 1");
      await votingSystem.addCandidate("Candidate 2", "Description 2");
      await votingSystem.registerVoter(voter1.address);
      await votingSystem.registerVoter(voter2.address);
    });

    it("Should correctly count votes", async function () {
      await votingSystem.startVoting(60);
      
      await votingSystem.connect(voter1).castVote(0);
      await votingSystem.connect(voter2).castVote(1);

      const results = await votingSystem.getResults();
      expect(results[0]).to.equal(1);
      expect(results[1]).to.equal(1);
    });
  });
}); 