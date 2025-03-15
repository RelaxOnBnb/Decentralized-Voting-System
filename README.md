# Decentralized Voting System

A blockchain-based decentralized voting system built using Ethereum smart contracts and modern web technologies.

## Features

- Secure and transparent voting process
- Immutable vote records on the blockchain
- Real-time vote counting and results
- Voter privacy through cryptographic techniques
- Admin dashboard for election management
- User-friendly interface for voters

## Technology Stack

- Solidity (Smart Contracts)
- Ethereum Blockchain
- Web3.js
- React.js
- Hardhat (Development Framework)
- MetaMask (Wallet Integration)

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14.0.0 or later)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [MetaMask](https://metamask.io/) browser extension
- [Git](https://git-scm.com/)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd decentralized-voting-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Hardhat globally:
   ```bash
   npm install -g hardhat
   ```

4. Configure your local environment:
   - Create a `.env` file in the root directory
   - Add the following variables:
     ```
     PRIVATE_KEY=your_private_key
     INFURA_PROJECT_ID=your_infura_project_id
     ```

5. Compile smart contracts:
   ```bash
   npx hardhat compile
   ```

6. Deploy smart contracts:
   ```bash
   npx hardhat run scripts/deploy.js --network <network-name>
   ```

7. Start the development server:
   ```bash
   npm start
   ```

## Smart Contract Structure

The main smart contract `VotingSystem.sol` contains the following key functions:

- `registerVoter`: Register a new voter (admin only)
- `addCandidate`: Add a new candidate (admin only)
- `startVoting`: Start the voting period (admin only)
- `castVote`: Cast a vote for a candidate
- `endVoting`: End the voting period (admin only)
- `getResults`: Get the voting results

## Security Considerations

- All sensitive operations are protected by access control
- Voter privacy is maintained through cryptographic techniques
- Smart contract includes checks against double voting
- Real-time validation of voting eligibility

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - your.email@example.com
Project Link: [https://github.com/yourusername/decentralized-voting-system](https://github.com/yourusername/decentralized-voting-system) 