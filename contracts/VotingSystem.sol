// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint256 votedFor;
    }

    struct Candidate {
        string name;
        string description;
        uint256 voteCount;
    }

    address public admin;
    mapping(address => Voter) public voters;
    Candidate[] public candidates;
    bool public votingOpen;
    uint256 public votingStart;
    uint256 public votingEnd;

    event VoterRegistered(address voter);
    event CandidateAdded(uint256 candidateId, string name);
    event VoteCast(address voter, uint256 candidateId);
    event VotingStarted(uint256 startTime, uint256 endTime);
    event VotingEnded(uint256 endTime);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier votingIsOpen() {
        require(votingOpen, "Voting is not open");
        require(block.timestamp >= votingStart && block.timestamp <= votingEnd, "Voting period has ended");
        _;
    }

    constructor() {
        admin = msg.sender;
        votingOpen = false;
    }

    function registerVoter(address _voter) public onlyAdmin {
        require(!voters[_voter].isRegistered, "Voter already registered");
        voters[_voter].isRegistered = true;
        emit VoterRegistered(_voter);
    }

    function addCandidate(string memory _name, string memory _description) public onlyAdmin {
        require(!votingOpen, "Cannot add candidate while voting is open");
        candidates.push(Candidate({
            name: _name,
            description: _description,
            voteCount: 0
        }));
        emit CandidateAdded(candidates.length - 1, _name);
    }

    function startVoting(uint256 _durationInMinutes) public onlyAdmin {
        require(!votingOpen, "Voting is already open");
        require(_durationInMinutes > 0, "Duration must be greater than 0");
        
        votingOpen = true;
        votingStart = block.timestamp;
        votingEnd = block.timestamp + (_durationInMinutes * 1 minutes);
        
        emit VotingStarted(votingStart, votingEnd);
    }

    function castVote(uint256 _candidateId) public votingIsOpen {
        require(voters[msg.sender].isRegistered, "Voter is not registered");
        require(!voters[msg.sender].hasVoted, "Voter has already voted");
        require(_candidateId < candidates.length, "Invalid candidate ID");

        voters[msg.sender].hasVoted = true;
        voters[msg.sender].votedFor = _candidateId;
        candidates[_candidateId].voteCount++;

        emit VoteCast(msg.sender, _candidateId);
    }

    function endVoting() public onlyAdmin {
        require(votingOpen, "Voting is not open");
        require(block.timestamp >= votingEnd, "Voting period has not ended");
        
        votingOpen = false;
        emit VotingEnded(block.timestamp);
    }

    function getCandidateCount() public view returns (uint256) {
        return candidates.length;
    }

    function getVotingStatus() public view returns (bool isOpen, uint256 timeRemaining) {
        if (!votingOpen || block.timestamp >= votingEnd) {
            return (false, 0);
        }
        return (true, votingEnd - block.timestamp);
    }

    function getResults() public view returns (uint256[] memory) {
        require(!votingOpen || block.timestamp >= votingEnd, "Voting is still in progress");
        
        uint256[] memory results = new uint256[](candidates.length);
        for (uint256 i = 0; i < candidates.length; i++) {
            results[i] = candidates[i].voteCount;
        }
        return results;
    }
} 