import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Link,
  useColorModeValue,
  useDisclosure,
  HStack,
  IconButton,
  CloseButton,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useWeb3 } from '../../contexts/Web3Context';

const Navbar = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { account, isAdmin, connectWallet } = useWeb3();

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        justify={'space-between'}
      >
        <Flex flex={{ base: 1 }} justify={'start'}>
          <Link as={RouterLink} to="/">
            <Text
              textAlign="left"
              fontFamily={'heading'}
              color={useColorModeValue('gray.800', 'white')}
              fontWeight="bold"
            >
              Decentralized Voting
            </Text>
          </Link>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
          display={{ base: 'none', md: 'flex' }}
        >
          {account ? (
            <>
              <Link as={RouterLink} to="/voter">
                <Button variant="ghost">Vote</Button>
              </Link>
              {isAdmin && (
                <Link as={RouterLink} to="/admin">
                  <Button variant="ghost">Admin</Button>
                </Link>
              )}
              <Text py={2} px={4} borderRadius="md" bg="gray.100">
                {`${account.slice(0, 6)}...${account.slice(-4)}`}
              </Text>
            </>
          ) : (
            <Button onClick={connectWallet} colorScheme="blue">
              Connect Wallet
            </Button>
          )}
        </Stack>

        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onToggle}
          icon={isOpen ? <CloseButton /> : <HamburgerIcon w={5} h={5} />}
          variant={'ghost'}
          aria-label={'Toggle Navigation'}
        />
      </Flex>

      {/* Mobile menu */}
      {isOpen && (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {account ? (
              <>
                <Link as={RouterLink} to="/voter">
                  <Button w="full" variant="ghost">
                    Vote
                  </Button>
                </Link>
                {isAdmin && (
                  <Link as={RouterLink} to="/admin">
                    <Button w="full" variant="ghost">
                      Admin
                    </Button>
                  </Link>
                )}
                <Text p={2} borderRadius="md" bg="gray.100" textAlign="center">
                  {`${account.slice(0, 6)}...${account.slice(-4)}`}
                </Text>
              </>
            ) : (
              <Button onClick={connectWallet} w="full" colorScheme="blue">
                Connect Wallet
              </Button>
            )}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Navbar; 