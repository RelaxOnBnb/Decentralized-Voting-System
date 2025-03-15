import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  SimpleGrid,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaVoteYea, FaUserShield, FaChartBar } from 'react-icons/fa';
import { useWeb3 } from '../../contexts/Web3Context';

const Feature = ({ title, text, icon }) => {
  return (
    <VStack
      p={8}
      bg={useColorModeValue('white', 'gray.800')}
      borderRadius="lg"
      boxShadow="lg"
      spacing={4}
      align="center"
      textAlign="center"
    >
      <Icon as={icon} w={10} h={10} color="brand.500" />
      <Heading size="md">{title}</Heading>
      <Text color={useColorModeValue('gray.600', 'gray.300')}>{text}</Text>
    </VStack>
  );
};

const Home = () => {
  const { account, connectWallet, isAdmin } = useWeb3();

  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')}>
      <Container maxW="container.xl" py={20}>
        <VStack spacing={16}>
          {/* Hero Section */}
          <VStack spacing={8} textAlign="center">
            <Heading
              size="2xl"
              bgGradient="linear(to-r, brand.500, brand.700)"
              bgClip="text"
            >
              Decentralized Voting System
            </Heading>
            <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.300')} maxW="2xl">
              A secure and transparent blockchain-based voting platform that ensures
              data integrity, anonymity, and auditability.
            </Text>
            {!account ? (
              <Button
                size="lg"
                colorScheme="blue"
                onClick={connectWallet}
              >
                Connect Wallet to Start
              </Button>
            ) : (
              <VStack spacing={4}>
                <Button
                  as={RouterLink}
                  to="/voter"
                  size="lg"
                  colorScheme="blue"
                >
                  Go to Voting Dashboard
                </Button>
                {isAdmin && (
                  <Button
                    as={RouterLink}
                    to="/admin"
                    size="lg"
                    variant="outline"
                    colorScheme="blue"
                  >
                    Admin Dashboard
                  </Button>
                )}
              </VStack>
            )}
          </VStack>

          {/* Features Section */}
          <Box>
            <Heading textAlign="center" mb={12}>
              Key Features
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
              <Feature
                icon={FaUserShield}
                title="Secure & Private"
                text="Your vote is protected by advanced cryptography and blockchain technology, ensuring complete privacy and security."
              />
              <Feature
                icon={FaVoteYea}
                title="Easy to Use"
                text="Simple and intuitive interface makes voting accessible to everyone, anywhere in the world."
              />
              <Feature
                icon={FaChartBar}
                title="Real-time Results"
                text="Watch the election unfold with real-time vote counting and result verification."
              />
            </SimpleGrid>
          </Box>

          {/* How It Works Section */}
          <VStack spacing={8}>
            <Heading>How It Works</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} maxW="4xl">
              <VStack align="start" spacing={4}>
                <Heading size="md">For Voters</Heading>
                <VStack align="start" spacing={2}>
                  <Text>1. Connect your Ethereum wallet</Text>
                  <Text>2. Get verified by the administrator</Text>
                  <Text>3. Cast your vote securely</Text>
                  <Text>4. View real-time results</Text>
                </VStack>
              </VStack>
              <VStack align="start" spacing={4}>
                <Heading size="md">For Administrators</Heading>
                <VStack align="start" spacing={2}>
                  <Text>1. Set up the voting event</Text>
                  <Text>2. Register eligible voters</Text>
                  <Text>3. Manage candidates</Text>
                  <Text>4. Monitor the voting process</Text>
                </VStack>
              </VStack>
            </SimpleGrid>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default Home; 