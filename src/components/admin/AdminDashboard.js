import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Input,
  FormControl,
  FormLabel,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Card,
  CardHeader,
  CardBody,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Progress,
  NumberInput,
  NumberInputField,
  Textarea,
} from '@chakra-ui/react';
import { useWeb3 } from '../../contexts/Web3Context';

const AdminDashboard = () => {
  const { contract, account, isAdmin } = useWeb3();
  const [candidates, setCandidates] = useState([]);
  const [voters, setVoters] = useState([]);
  const [votingStatus, setVotingStatus] = useState({ isOpen: false, timeRemaining: 0 });
  const [loading, setLoading] = useState(true);
  const [newVoter, setNewVoter] = useState('');
  const [newCandidate, setNewCandidate] = useState({ name: '', description: '' });
  const [votingDuration, setVotingDuration] = useState(60);
  const toast = useToast();

  useEffect(() => {
    if (contract && account) {
      loadDashboardData();
    }
  }, [contract, account]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Get voting status
      const status = await contract.getVotingStatus();
      setVotingStatus({
        isOpen: status.isOpen,
        timeRemaining: status.timeRemaining.toNumber()
      });

      // Get candidates
      const candidateCount = await contract.getCandidateCount();
      const candidatesData = [];
      for (let i = 0; i < candidateCount; i++) {
        const candidate = await contract.candidates(i);
        candidatesData.push({
          id: i,
          name: candidate.name,
          description: candidate.description,
          voteCount: candidate.voteCount.toNumber()
        });
      }
      setCandidates(candidatesData);

      setLoading(false);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load dashboard data',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const handleRegisterVoter = async () => {
    try {
      if (!ethers.utils.isAddress(newVoter)) {
        throw new Error('Invalid Ethereum address');
      }

      const tx = await contract.registerVoter(newVoter);
      await tx.wait();

      toast({
        title: 'Success',
        description: 'Voter registered successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      setNewVoter('');
      loadDashboardData();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleAddCandidate = async () => {
    try {
      if (!newCandidate.name || !newCandidate.description) {
        throw new Error('Please fill in all candidate details');
      }

      const tx = await contract.addCandidate(newCandidate.name, newCandidate.description);
      await tx.wait();

      toast({
        title: 'Success',
        description: 'Candidate added successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      setNewCandidate({ name: '', description: '' });
      loadDashboardData();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleStartVoting = async () => {
    try {
      const tx = await contract.startVoting(votingDuration);
      await tx.wait();

      toast({
        title: 'Success',
        description: 'Voting started successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      loadDashboardData();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleEndVoting = async () => {
    try {
      const tx = await contract.endVoting();
      await tx.wait();

      toast({
        title: 'Success',
        description: 'Voting ended successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      loadDashboardData();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (!isAdmin) {
    return (
      <Container maxW="container.xl" py={10}>
        <VStack spacing={4} align="center">
          <Heading size="lg">Access Denied</Heading>
          <Text>You do not have administrator privileges.</Text>
        </VStack>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container maxW="container.xl" py={10}>
        <Progress size="xs" isIndeterminate />
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading size="lg">Admin Dashboard</Heading>

        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Voting Management</Tab>
            <Tab>Candidates</Tab>
            <Tab>Voter Registration</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Card>
                <CardHeader>
                  <Heading size="md">Voting Status</Heading>
                </CardHeader>
                <CardBody>
                  <VStack spacing={4} align="stretch">
                    <Badge
                      colorScheme={votingStatus.isOpen ? 'green' : 'red'}
                      fontSize="md"
                      p={2}
                      borderRadius="md"
                    >
                      {votingStatus.isOpen ? 'Voting is Open' : 'Voting is Closed'}
                    </Badge>

                    {votingStatus.isOpen && (
                      <Text>
                        Time Remaining: {Math.floor(votingStatus.timeRemaining / 60)} minutes
                      </Text>
                    )}

                    {!votingStatus.isOpen ? (
                      <HStack>
                        <NumberInput
                          value={votingDuration}
                          onChange={(value) => setVotingDuration(parseInt(value))}
                          min={1}
                        >
                          <NumberInputField placeholder="Duration (minutes)" />
                        </NumberInput>
                        <Button colorScheme="blue" onClick={handleStartVoting}>
                          Start Voting
                        </Button>
                      </HStack>
                    ) : (
                      <Button colorScheme="red" onClick={handleEndVoting}>
                        End Voting
                      </Button>
                    )}
                  </VStack>
                </CardBody>
              </Card>
            </TabPanel>

            <TabPanel>
              <Card>
                <CardHeader>
                  <Heading size="md">Add New Candidate</Heading>
                </CardHeader>
                <CardBody>
                  <VStack spacing={4}>
                    <FormControl>
                      <FormLabel>Name</FormLabel>
                      <Input
                        value={newCandidate.name}
                        onChange={(e) =>
                          setNewCandidate({ ...newCandidate, name: e.target.value })
                        }
                        placeholder="Enter candidate name"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Description</FormLabel>
                      <Textarea
                        value={newCandidate.description}
                        onChange={(e) =>
                          setNewCandidate({ ...newCandidate, description: e.target.value })
                        }
                        placeholder="Enter candidate description"
                      />
                    </FormControl>
                    <Button colorScheme="blue" onClick={handleAddCandidate}>
                      Add Candidate
                    </Button>
                  </VStack>
                </CardBody>
              </Card>

              <Box mt={6}>
                <Heading size="md" mb={4}>
                  Candidates List
                </Heading>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Description</Th>
                      <Th isNumeric>Votes</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {candidates.map((candidate) => (
                      <Tr key={candidate.id}>
                        <Td>{candidate.name}</Td>
                        <Td>{candidate.description}</Td>
                        <Td isNumeric>{candidate.voteCount}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </TabPanel>

            <TabPanel>
              <Card>
                <CardHeader>
                  <Heading size="md">Register New Voter</Heading>
                </CardHeader>
                <CardBody>
                  <VStack spacing={4}>
                    <FormControl>
                      <FormLabel>Voter Address</FormLabel>
                      <Input
                        value={newVoter}
                        onChange={(e) => setNewVoter(e.target.value)}
                        placeholder="Enter Ethereum address"
                      />
                    </FormControl>
                    <Button colorScheme="blue" onClick={handleRegisterVoter}>
                      Register Voter
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  );
};

export default AdminDashboard; 