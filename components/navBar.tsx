import {
    Skeleton,
    SkeletonCircle,
    HStack,
    Box,
    Wrap,
    WrapItem,
    Avatar,
    Text,
    Center,
    Divider,
    Select,
    Button,
    Flex,
    AvatarBadge,
    MenuButton,
    MenuList,
    MenuItem,
    Menu,
    Input,
} from '@chakra-ui/react';
import { MdArrowDropDown } from 'react-icons/md';
// import { useRouter } from 'next/router';
import { useMe } from '../lib/hooks';
// import Link from 'next/link';

const NavBar = () => {
    const { user, isLoading, isError } = useMe();
    // const router = useRouter();

    return (
        <Box>
            <Flex justify="space-between" width="100%" padding="1rem">
                <Input width="40%" variant="outline" placeholder="Outline" />
                <Flex
                    width="15%"
                    direction="row"
                    justify="flex-end"
                    marginRight="1em"
                    gap="1em"
                >
                    <Skeleton isLoaded={!isLoading}>
                        <Text fontSize="1rem" color="white">
                            {user?.firstName} {user?.lastName}
                        </Text>
                    </Skeleton>
                    <SkeletonCircle isLoaded={!isLoading} size="10">
                        <HStack>
                            <Avatar
                                name={`${user?.firstName} ${user?.lastName}`}
                                // src="/me2-no-bg.png"
                                size="sm"
                                border="0.1rem solid green"
                            >
                                <AvatarBadge boxSize="1em" bg="green.500" />
                            </Avatar>
                            <Menu>
                                <MenuButton>
                                    <MdArrowDropDown color="white" />
                                </MenuButton>
                                <MenuList>
                                    <MenuItem as="a" href="/logout">
                                        Logout
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </HStack>
                    </SkeletonCircle>
                </Flex>
            </Flex>
            <Divider orientation="horizontal" color="#783a54" />
            {/* <Divider orientation="horizontal" color="#552C3D" /> */}
        </Box>
    );
};

export default NavBar;
