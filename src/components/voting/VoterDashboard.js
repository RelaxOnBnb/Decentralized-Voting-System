import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Button,
  VStack,
  useToast,
  Badge,
  Card,
  CardBody,
  CardHeader,
  Progress,
} from '@chakra-ui/react';
import { useWeb3 } from '../../contexts/Web3Context';

const VoterDashboard = () => {
  const { contract, account } = useWeb3();
  const [candidates, setCandidates] = useState([]);
  const [votingStatus, setVotingStatus] = useState({ isOpen: false, timeRemaining: 0 });
  const [isRegistered, setIsRegistered] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    if (contract && account) {
      loadVotingData();
    }
  }, [contract, account]);

  const loadVotingData = async () => {
    try {
      setLoading(true);
      
      // Get voting status
      const status = await contract.getVotingStatus();
      setVotingStatus({
        isOpen: status.isOpen,
        timeRemaining: status.timeRemaining.toNumber()
      });

      // Get voter info
      const voter = await contract.voters(account);
      setIsRegistered(voter.isRegistered);
      setHasVoted(voter.hasVoted);

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
      console.error('Error loading voting data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load voting data',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const handleVote = async (candidateId) => {
    try {
      const tx = await contract.castVote(candidateId);
      await tx.wait();
      
      toast({
        title: 'Success',
        description: 'Your vote has been cast successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      loadVotingData();
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

  if (loading) {
    return (
      <Container maxW="container.xl" py={10}>
        <Progress size="xs" isIndeterminate />
      </Container>
    );
  }

  if (!isRegistered) {
    return (
      <Container maxW="container.xl" py={10}>
        <VStack spacing={4} align="center">
          <Heading size="lg">Not Registered</Heading>
          <Text>You are not registered to vote. Please contact the administrator.</Text>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="lg" mb={4}>Voter Dashboard</Heading>
          <Badge
            colorScheme={votingStatus.isOpen ? 'green' : 'red'}
            fontSize="md"
            p={2}
            borderRadius="md"
          >
            {votingStatus.isOpen ? 'Voting is Open' : 'Voting is Closed'}
          </Badge>
          {votingStatus.isOpen && (
            <Text mt={2}>
              Time Remaining: {Math.floor(votingStatus.timeRemaining / 60)} minutes
            </Text>
          )}
        </Box>

        {hasVoted ? (
          <Box bg="green.50" p={6} borderRadius="lg">
            <Text fontSize="lg" color="green.600">
              You have already cast your vote. Thank you for participating!
            </Text>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {candidates.map((candidate) => (
              <Card key={candidate.id}>
                <CardHeader>
                  <Heading size="md">{candidate.name}</Heading>
                </CardHeader>
                <CardBody>
                  <VStack align="stretch" spacing={4}>
                    <Text>{candidate.description}</Text>
                    <Button
                      colorScheme="blue"
                      isDisabled={!votingStatus.isOpen || hasVoted}
                      onClick={() => handleVote(candidate.id)}
                    >
                      Vote
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
};

export default VoterDashboard; 