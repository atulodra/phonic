import { Box, Flex, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';

const PagesLayout = ({
    color,
    children,
    image,
    title,
    subtitle,
    description,
    roundImage,
}) => {
    return (
        <Box
            height="100%"
            overflow="auto"
            // bgGradient = {`linear(${color} 0%, ${color} 15%, ${color} 40%, rbga(0,0,0,0.95) 75%)`}
            bgGradient="linear(to-bl, brand.1, brand.2, brand.3, brand.4)"
            boxShadow="dark-lg"
            border="1px solid #552C3D"
            borderRadius="10px"
        >
            <Flex bg={`${color}`} padding="40px" align="end">
                <Box padding="20px">
                    <Image
                        boxSize="160px"
                        objectFit="cover"
                        boxShadow="2xl"
                        src={image}
                        borderRadius={roundImage ? '100%' : '3px'}
                        fallbackSrc="https://via.placeholder.com/150"
                    />
                </Box>
                <Box padding="20px" lineHeight="40px">
                    <Text fontSize="xs" fontWeight="bold" casing="uppercase">
                        {subtitle}
                    </Text>
                    <Text fontSize="5xl">{title}</Text>
                    <Text fontSize="xs">{description}</Text>
                </Box>
            </Flex>
            <Box paddingY="50px">{children}</Box>
        </Box>
    );
};
export default PagesLayout;
