import { Flex, Box, Text, Divider } from '@chakra-ui/layout';
import { Image, Skeleton, SkeletonCircle } from '@chakra-ui/react';

const UserLayout = ({
    children,
    image,
    title,
    subtitle,
    description,
    isLoading,
}) => {
    return (
        <Box
            height="100%"
            overflow="auto"
            // bgGradient = {`linear(${color} 0%, ${color} 15%, ${color} 40%, rbga(0,0,0,0.95) 75%)`}
            bgGradient="linear(to-bl, brand.1, brand.2, brand.3, brand.4)"
            // background="#686868"
            boxShadow="dark-lg"
            border="1px solid #552C3D"
            borderRadius="10px"
            padding="3em"
            backdropFilter="auto"
            backdropBlur="3xl"
            // paddingBottom="5em"
            sx={{
                '&::-webkit-scrollbar': {
                    width: '0.4em',
                },
                '&::-webkit-scrollbar-track': {
                    // width: '0.8em',
                    backgroundColor: '#fff',
                    borderRadius: '24px',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: '#a22968',
                    borderRadius: '24px',
                },
            }}
        >
            <Flex align="end">
                <Box padding="20px">
                    <SkeletonCircle size="140px" isLoaded={!isLoading}>
                        <Image
                            boxSize="140px"
                            objectFit="cover"
                            boxShadow="2xl"
                            src={image}
                            borderRadius="100%"
                            // borderRadius={roundImage ? '100%' : '3px'}
                            // fallbackSrc="https://via.placeholder.com/150"
                            fallbackSrc="https://placekitten.com/408/287"
                        />
                    </SkeletonCircle>
                </Box>
                <Box padding="20px" lineHeight="40px" width="80%">
                    <Text fontSize="xs" fontWeight="bold" casing="uppercase">
                        {subtitle}
                    </Text>
                    <Skeleton isLoaded={!isLoading}>
                        <Text fontSize="5xl">{title}</Text>
                    </Skeleton>
                    <Text fontSize="xs">{description}</Text>
                </Box>
            </Flex>
            <Box paddingTop="30px">{children}</Box>
        </Box>
    );
};
export default UserLayout;
