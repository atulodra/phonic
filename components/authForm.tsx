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
  } from '@chakra-ui/react';

import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';
import { FC, useState } from 'react';
import { auth } from '../lib/mutations';
import NextImage  from 'next/image'


const AuthForm: FC<{ mode: 'signin' | 'signup' }> = ({ mode }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        await auth(mode, { email, password })
        setIsLoading(false)
        router.push('/')
    }
    return(
        <Box height="100vh" width="100vw">
            <Flex
            justify="center"
            align="center"
            height="100px"
            // borderBottom="white 1px solid"
            >
                <Text fontFamily="Corbel" fontSize='50px' fontWeight="Bold"  color='white' filter="drop-shadow(0 0 0.75rem crimson)">phonic</Text>
            </Flex>
            <Flex justify="center" align="center" height="calc(100vh - 100px)" filter="drop-shadow(0 0 0.75rem #f00897)">
                <Box padding="100px" bg="#0C0B0B" borderRadius="20px">
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={4}>
                            <Input
                                placeholder="email"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                bg="white"
                            />
                            <Input
                                placeholder="password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                bg="white"
                            />
                            <Button
                                type="submit"
                                bg="#990B46"
                                color= "white"
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
            </Flex>
        </Box>
    )
}

export default AuthForm