// import { Box, Flex, Input, Button } from '@chakra-ui/react';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Image,
    Center,
    HStack,
    VStack,
    AbsoluteCenter,
    usePrefersReducedMotion,
} from '@chakra-ui/react';

import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';
import { FC, useState } from 'react';
// import NextImage from 'next/image';
import { auth } from '../lib/mutations';

const AuthForm: FC<{ mode: 'signin' | 'signup' }> = ({ mode }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (mode === 'signup') {
            await auth(mode, { email, password, firstName, lastName });
        } else {
            await auth(mode, { email, password });
        }
        setIsLoading(false);
        router.push('/');
    };
    return (
        <Box display="flex">
            {mode === 'signin' ? (
                <>
                    <Box
                        // width="50%"
                        // bg="#ccc5c5"
                        bgGradient="linear(to-b, #6B084D, #29235C)"
                        // bgGradient="linear(to-b, #85005C, #29235C)"
                        height="100%"
                        width="50%"
                        position="fixed"
                        z-index="1"
                        top="0"
                        overflow-x="hidden"
                        left="0"
                        display="flex"
                        flexDirection="column"
                    >
                        <AbsoluteCenter axis="both">
                            <Center>
                                <HStack marginY="30px" spacing={4}>
                                    <Image
                                        src="Asset 9 1.svg"
                                        width="75px"
                                        height="75px"
                                    />
                                    <Text
                                        // fontFamily="Futura"
                                        fontSize="56px"
                                        fontWeight="bold"
                                        color="white"
                                    >
                                        Phonic
                                    </Text>
                                </HStack>
                            </Center>
                            <VStack
                                sx={{}}
                                paddingY="100px"
                                paddingX="80px"
                                // bg="#0C0B0B"
                                // bg="#fdfbfb"
                                bg="#fff"
                                borderRadius="1rem"
                                // filter="drop-shadow(0 0 0.75rem #f00897)"
                                height="60%"
                                // width="80%"
                                aspectRatio="2/1"
                                spacing={6}
                                // animation={animation}
                                _before={{
                                    content: '""',
                                    position: 'absolute',
                                    inset: '-0.5rem',
                                    // bg: '#f00897',
                                    bgImage: `conic-gradient(from 0deg, #6c288b, #692323, #4b1549)`,
                                    borderRadius: 'inherit',
                                    // animation: { animation },
                                    zIndex: -1,
                                }}
                                _after={{
                                    content: '""',
                                    position: 'absolute',
                                    inset: '-0.5rem',
                                    // bg: '#f00897',
                                    bgImage: `conic-gradient(from 0deg, #6c288b, #692323, #4b1549)`,
                                    borderRadius: 'inherit',
                                    // animation: { animation },
                                    filter: 'blur(3.5rem)',
                                    zIndex: -1,
                                }}
                            >
                                <Text
                                    fontSize="20px"
                                    textTransform="uppercase"
                                    fontWeight="medium"
                                >
                                    Welcome Back!!!
                                </Text>
                                <form onSubmit={handleSubmit}>
                                    <Stack spacing={5}>
                                        <FormControl>
                                            <FormLabel>Email</FormLabel>
                                            <Input
                                                placeholder="email"
                                                type="email"
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                // bg="black"
                                                bg="#fdfbfb"
                                                size="lg"
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Password</FormLabel>
                                            <Input
                                                placeholder="password"
                                                type="password"
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                // bg="white"
                                                bg="#fdfbfb"
                                                size="lg"
                                            />
                                        </FormControl>
                                        <Button
                                            // marginY="30px"
                                            type="submit"
                                            bg="#990B46"
                                            color="white"
                                            isLoading={isLoading}
                                            sx={{
                                                '&:hover': {
                                                    bg: '#11A6BA',
                                                },
                                            }}
                                        >
                                            {mode}
                                        </Button>
                                    </Stack>
                                </form>
                                <Text>
                                    Ready to join us?!{' '}
                                    <Link
                                        href="/signup"
                                        color="#e6347e"
                                        sx={{
                                            '&:hover': {
                                                textDecoration: 'none',
                                                filter: 'drop-shadow(0 0 0.75rem #ff68a7)',
                                            },
                                        }}
                                        // textDecoration="none"
                                    >
                                        Sign Up!
                                    </Link>
                                </Text>
                            </VStack>
                        </AbsoluteCenter>
                    </Box>
                    <Box
                        height="100%"
                        width="50%"
                        position="fixed"
                        z-index="1"
                        top="0"
                        overflow-x="hidden"
                        right="0"
                        bgImage="url('pexels-wendy-wei-1864642 1@2x.jpg')"
                        bgRepeat="no-repeat"
                        bgSize="contain"
                        bgPos="50% 90%"
                        color="white"
                        bgColor="#000200"
                    >
                        <Text
                            fontSize="2.5rem"
                            fontFamily="Futura"
                            opacity="0.8"
                            margin="3rem"
                            color="white"
                        >
                            Welcome To Phonic!!
                        </Text>
                        {/* <Image
                            src="/Group 10.jpg"
                            height="100%"
                            width="100%"
                            objectFit="contain"
                            objectPosition="90% 10%"
                        /> */}
                    </Box>
                </>
            ) : (
                <>
                    <Box
                        height="100%"
                        width="50%"
                        position="fixed"
                        z-index="1"
                        top="0"
                        overflow-x="hidden"
                        bgImage="url('pexels-photo-1644616.jpeg')"
                        bgRepeat="no-repeat"
                        bgSize="cover"
                        bgPos="50% 10%"
                        color="white"
                        bgColor="#000200"
                        left="0"
                    >
                        <Text
                            fontSize="2.5rem"
                            fontFamily="Futura"
                            opacity="0.8"
                            margin="3rem"
                            color="white"
                        >
                            Welcome To Phonic!!
                        </Text>
                        {/* <Image
                            src="/Group 10.jpg"
                            height="100%"
                            width="100%"
                            objectFit="contain"
                            objectPosition="90% 10%"
                        /> */}
                    </Box>{' '}
                    <Box
                        // width="50%"
                        // bg="#ccc5c5"
                        bgGradient="linear(to-b, #6B084D, #29235C)"
                        // bgGradient="linear(to-b, #85005C, #29235C)"
                        height="100%"
                        width="50%"
                        position="fixed"
                        z-index="1"
                        top="0"
                        overflow-x="hidden"
                        display="flex"
                        flexDirection="column"
                        right="0"
                    >
                        <AbsoluteCenter axis="both">
                            <Center>
                                <HStack marginY="30px" spacing={4}>
                                    <Image
                                        src="Asset 9 1.svg"
                                        width="75px"
                                        height="75px"
                                    />
                                    <Text
                                        // fontFamily="Futura"
                                        fontSize="56px"
                                        fontWeight="bold"
                                        color="white"
                                    >
                                        Phonic
                                    </Text>
                                </HStack>
                            </Center>
                            <VStack
                                sx={{}}
                                paddingY="20px"
                                paddingX="80px"
                                // bg="#0C0B0B"
                                // bg="#fdfbfb"
                                bg="#fff"
                                borderRadius="1rem"
                                // filter="drop-shadow(0 0 0.75rem #f00897)"
                                height="60%"
                                // width="80%"
                                aspectRatio="2/1"
                                spacing={6}
                                // animation={animation}
                                _before={{
                                    content: '""',
                                    position: 'absolute',
                                    inset: '-0.5rem',
                                    // bg: '#f00897',
                                    bgImage: `conic-gradient(from 0deg, #6c288b, #692323, #4b1549)`,
                                    borderRadius: 'inherit',
                                    // animation: { animation },
                                    zIndex: -1,
                                }}
                                _after={{
                                    content: '""',
                                    position: 'absolute',
                                    inset: '-0.5rem',
                                    // bg: '#f00897',
                                    bgImage: `conic-gradient(from 0deg, #6c288b, #692323, #4b1549)`,
                                    borderRadius: 'inherit',
                                    // animation: { animation },
                                    filter: 'blur(3.5rem)',
                                    zIndex: -1,
                                }}
                            >
                                <Text
                                    fontSize="20px"
                                    textTransform="uppercase"
                                    fontWeight="medium"
                                >
                                    Join Us!
                                </Text>
                                <form onSubmit={handleSubmit}>
                                    <Stack spacing={5}>
                                        <FormControl>
                                            <FormLabel>First Name</FormLabel>
                                            <Input
                                                placeholder="Fist Name"
                                                type="text"
                                                onChange={(e) =>
                                                    setFirstName(e.target.value)
                                                }
                                                // bg="white"
                                                bg="#fdfbfb"
                                                size="md"
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Last Name</FormLabel>
                                            <Input
                                                placeholder="Last Name"
                                                type="text"
                                                onChange={(e) =>
                                                    setLastName(e.target.value)
                                                }
                                                // bg="white"
                                                bg="#fdfbfb"
                                                size="md"
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Email</FormLabel>
                                            <Input
                                                placeholder="email"
                                                type="email"
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                // bg="black"
                                                bg="#fdfbfb"
                                                size="md"
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Password</FormLabel>
                                            <Input
                                                placeholder="password"
                                                type="password"
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                // bg="white"
                                                bg="#fdfbfb"
                                                size="md"
                                            />
                                        </FormControl>

                                        <Button
                                            // marginY="30px"
                                            type="submit"
                                            bg="#990B46"
                                            color="white"
                                            isLoading={isLoading}
                                            sx={{
                                                '&:hover': {
                                                    bg: '#11A6BA',
                                                },
                                            }}
                                        >
                                            {mode}
                                        </Button>
                                    </Stack>
                                </form>
                                <Text>
                                    Already a member?!{' '}
                                    <Link
                                        href="/signin"
                                        color="#e6347e"
                                        sx={{
                                            '&:hover': {
                                                textDecoration: 'none',
                                                filter: 'drop-shadow(0 0 0.75rem #ff68a7)',
                                            },
                                        }}
                                        // textDecoration="none"
                                    >
                                        Sign In!
                                    </Link>
                                </Text>
                            </VStack>
                        </AbsoluteCenter>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default AuthForm;
