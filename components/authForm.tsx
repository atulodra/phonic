// import { Box, Flex, Input, Button } from '@chakra-ui/react';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Image,
    Center,
} from '@chakra-ui/react';

import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';
import { FC, useState } from 'react';
import NextImage from 'next/image';
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
        // <Box height="100vh" width="100vw">
        //     <Flex
        //         justify="center"
        //         align="center"
        //         height="100px"
        //         // borderBottom="white 1px solid"
        //     >
        //         <Text
        //             fontFamily="Corbel"
        //             fontSize="50px"
        //             fontWeight="Bold"
        //             color="white"
        //             filter="drop-shadow(0 0 0.75rem crimson)"
        //         >
        //             phonic
        //         </Text>
        //     </Flex>
        //     <Flex
        //         justify="center"
        //         align="center"
        //         height="calc(100vh - 100px)"
        //         filter="drop-shadow(0 0 0.75rem #f00897)"
        //     >
        //         <Box padding="100px" bg="#0C0B0B" borderRadius="20px">
        //             <form onSubmit={handleSubmit}>
        //                 <Stack spacing={4}>
        //                     <Input
        //                         placeholder="email"
        //                         type="email"
        //                         onChange={(e) => setEmail(e.target.value)}
        //                         bg="white"
        //                     />
        //                     <Input
        //                         placeholder="password"
        //                         type="password"
        //                         onChange={(e) => setPassword(e.target.value)}
        //                         bg="white"
        //                     />
        //                     {mode === 'signup' && (
        //                         <>
        //                             <Input
        //                                 placeholder="first name"
        //                                 type="text"
        //                                 onChange={(e) =>
        //                                     setFirstName(e.target.value)
        //                                 }
        //                                 bg="white"
        //                             />
        //                             <Input
        //                                 placeholder="last name"
        //                                 type="text"
        //                                 onChange={(e) =>
        //                                     setLastName(e.target.value)
        //                                 }
        //                                 bg="white"
        //                             />
        //                         </>
        //                     )}
        //                     <Button
        //                         type="submit"
        //                         bg="#990B46"
        //                         color="white"
        //                         isLoading={isLoading}
        //                         sx={{
        //                             '&:hover': {
        //                                 bg: '#11A6BA',
        //                             },
        //                         }}
        //                     >
        //                         {mode}
        //                     </Button>
        //                 </Stack>
        //             </form>
        //         </Box>
        //     </Flex>
        // </Box>
        <Box display="flex">
            {mode === 'signin' ? (
                <>
                    <Center
                        // width="50%"
                        bg="#ccc5c5"
                        height="100%"
                        width="50%"
                        position="fixed"
                        z-index="1"
                        top="0"
                        overflow-x="hidden"
                        left="0"
                    >
                        <Box
                            padding="100px"
                            bg="#0C0B0B"
                            borderRadius="20px"
                            filter="drop-shadow(0 0 0.75rem #f00897)"
                            height="60%"
                        >
                            <form onSubmit={handleSubmit}>
                                <Stack spacing={4}>
                                    <Input
                                        placeholder="email"
                                        type="email"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        bg="white"
                                    />
                                    <Input
                                        placeholder="password"
                                        type="password"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        bg="white"
                                    />
                                    <Button
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
                        </Box>
                    </Center>
                    <Box
                        height="100%"
                        width="50%"
                        position="fixed"
                        z-index="1"
                        top="0"
                        overflow-x="hidden"
                        right="0"
                        bgImage="url('Group 10.jpg')"
                        color="white"
                        textAlign="center"
                    >
                        {/* <Image src="/Group 10.jpg" /> */}
                        <Text>This is an image</Text>
                    </Box>
                </>
            ) : (
                <>
                    <Box width="50vw" height="100vh" bg="white">
                        <Text>Image</Text>
                    </Box>
                    <Box width="50vw" height="100vh" color="white">
                        <Text>Sign Up</Text>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default AuthForm;
