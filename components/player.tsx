import {
    ButtonGroup,
    Box,
    IconButton,
    RangeSlider,
    RangeSliderFilledTrack,
    RangeSliderTrack,
    RangeSliderThumb,
    Center,
    Flex,
    Text,
  } from '@chakra-ui/react';
  import ReactHowler from 'react-howler';
import { useEffect, useRef, useState } from 'react'
import {
    MdShuffle,
    MdSkipPrevious,
    MdSkipNext,
    MdOutlinePlayCircleFilled,
    MdOutlinePauseCircleFilled,
    MdOutlineRepeat,
    MdRepeat,
  } from 'react-icons/md'
  import { useStoreActions } from 'easy-peasy'

  const Player = () => {
    return (
        <Box>
            <Box>
                {/* {React Howler Implementation} */}
            </Box>
            <Center>
                <ButtonGroup>
                    <IconButton
                        outline="none"
                        variant="link"
                        aria-label="shuffle"
                        fontSize="24px"
                        icon={<MdShuffle />}
                    />
                     <IconButton
                        outline="none"
                        variant="link"
                        aria-label="previous"
                        fontSize="24px"
                        icon={<MdSkipPrevious />}
                    />
                     <IconButton
                        outline="none"
                        variant="link"
                        aria-label="play"
                        fontSize="40px"
                        icon={<MdOutlinePlayCircleFilled />}
                    />
                     <IconButton
                        outline="none"
                        variant="link"
                        aria-label="pause"
                        fontSize="40px"
                        icon={<MdOutlinePauseCircleFilled />}
                    />
                     <IconButton
                        outline="none"
                        variant="link"
                        aria-label="next"
                        fontSize="24px"
                        icon={<MdSkipNext />}
                    />
                     <IconButton
                        outline="none"
                        variant="link"
                        aria-label="repeat"
                        fontSize="24px"
                        icon={<MdOutlineRepeat />}
                    />
                </ButtonGroup>
            </Center>
            <Box color="gray.600">
                <Flex justify="center" align="center">
                    <Box width="10%">
                        <Text fontSize="xs">
                            2:09
                        </Text>
                    </Box>
                </Flex>
            </Box>
        </Box>
    )
  }
  export default Player;