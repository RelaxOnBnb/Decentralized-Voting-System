# Decentralized Voting System

This project is a secure and transparent decentralized voting system built using **Solidity**, **Hardhat**, and **React.js**. The system leverages blockchain technology to ensure immutable vote records, prevent manipulation, and provide a reliable voting platform.

## Features

### **Smart Contract (********`contracts/VotingSystem.sol`********)**

- Implements core voting functionality
- Manages voter registration, candidate management, and vote casting
- Ensures security through access control and voter verification
- Provides automated vote counting and result retrieval

### **Test Suite (********`test/VotingSystem.test.js`********)**

- Comprehensive tests for:
  - Contract deployment
  - Voter registration
  - Candidate management
  - Voting process
  - Results accuracy

### **Deployment Script (********`scripts/deploy.js`********)**

- Automates contract deployment to various networks
- Includes contract verification on Etherscan for transparency

### **Configuration Files**

- **`hardhat.config.js`**: Defines network configurations and compiler settings
- **`package.json`**: Manages project dependencies and scripts
- **`.gitignore`**: Ensures unnecessary files are excluded from version control

### **User Interface (UI)**

Built with **React.js** and **Chakra UI**, the UI ensures smooth interaction for voters and administrators.

#### **Voter Features**

- View registered candidates
- Cast votes securely with MetaMask integration
- Monitor voting status and remaining time
- View real-time election results

#### **Admin Features**

- Register voters securely
- Add and manage candidates
- Start and end voting sessions
- Monitor voting progress in real-time
- View and analyze election results

### **Security Features**

- **Access Control:** Restricts administrative actions to authorized personnel
- **Prevention of Double Voting:** Ensures each voter can cast their vote only once
- **Time-Based Voting Periods:** Enforces deadlines to manage voting sessions
- **Voter Privacy:** Utilizes address-based identification for anonymity
- **Wallet Authentication:** Ensures secure access through MetaMask

### **Enhanced UI Design**

- Clean and intuitive layout
- Real-time updates and status tracking
- Dark/light mode support
- Error handling with informative messages
- Mobile responsiveness for broader accessibility

## Installation Guide

### **1. Clone the Repository**

```bash
git clone https://github.com/RelaxOnBnb/Decentralized-Voting-System.git
cd Decentralized-Voting-System
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Environment Configuration**

Create a `.env` file with the following variables:

```
PRIVATE_KEY=your_private_key
INFURA_PROJECT_ID=your_infura_project_id
ETHERSCAN_API_KEY=your_etherscan_api_key
REACT_APP_CONTRACT_ADDRESS=your_deployed_contract_address
```

### **4. Run Tests**

```bash
npm test
```

### **5. Deploy the Contract**

In one terminal:

```bash
npm run node
```

In another terminal:

```bash
npm run deploy
```

### **6. Start the Frontend Application**

```bash
npm start
```

## Future Enhancements

- Integration of biometric authentication for additional security
- Implementation of a visual dashboard for enhanced result analytics
- Use of Zero-Knowledge Proofs (ZKP) for improved voter privacy

## Contribution

Contributions are welcome! Feel free to submit issues or pull requests for new features, bug fixes, or documentation improvements.

## License

This project is licensed under the [MIT License](LICENSE).

---

