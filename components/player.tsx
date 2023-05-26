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
import { useEffect, useRef, useState } from 'react';
import {
    FiShuffle,
    FiSkipForward,
    FiSkipBack,
    FiPlayCircle,
    FiPauseCircle,
    FiRepeat,
    FiChevronRight,
    FiChevronLeft,
} from 'react-icons/fi';
import {
    HiPlayCircle,
    HiArrowsRightLeft,
    HiPauseCircle,
} from 'react-icons/hi2';

const Player = ({ songs, activeSong }) => {
    const [playing, setPlaying] = useState(false);
    const [index, setIndex] = useState(0);
    const [seek, setSeek] = useState(0.0);
    const [repeat, setRepeat] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const [duration, setDuration] = useState(0.0);
    const soundRef = useRef(null);

    const setPlaystate = (value) => {
        setPlaying(value);
    };

    const onShuffle = () => {
        setShuffle((shuffle) => !shuffle);
    };

    const onRepeat = () => {
        setRepeat((repeat) => !repeat);
    };
    console.log(activeSong);

    return (
        <Box>
            <Box>
                <ReactHowler
                    playing={playing}
                    src={activeSong?.url}
                    // ref={soundRef}
                />
            </Box>
            <Center>
                <ButtonGroup colorScheme="#DEDEDE">
                    <IconButton
                        outline="none"
                        variant="link"
                        aria-label="shuffle"
                        fontSize="24px"
                        icon={<HiArrowsRightLeft />}
                        color={shuffle ? 'white' : 'gray.700'}
                        onClick={onShuffle}
                    />
                    <IconButton
                        outline="none"
                        variant="link"
                        aria-label="previous"
                        fontSize="24px"
                        icon={<FiChevronLeft />}
                    />
                    {playing ? (
                        <IconButton
                            outline="none"
                            variant="link"
                            aria-label="pause"
                            fontSize="48px"
                            icon={<HiPauseCircle />}
                            onClick={() => setPlaystate(false)}
                        />
                    ) : (
                        <IconButton
                            outline="none"
                            variant="link"
                            aria-label="play"
                            fontSize="48px"
                            icon={<HiPlayCircle />}
                            onClick={() => setPlaystate(true)}
                        />
                    )}
                    <IconButton
                        outline="none"
                        variant="link"
                        aria-label="next"
                        fontSize="24px"
                        icon={<FiChevronRight />}
                    />
                    <IconButton
                        outline="none"
                        variant="link"
                        aria-label="repeat"
                        fontSize="24px"
                        icon={<FiRepeat />}
                        color={repeat ? 'white' : 'gray.700'}
                        onClick={onRepeat}
                    />
                </ButtonGroup>
            </Center>
            <Box>
                <Flex justify="center" align="center">
                    <Box width="10%">
                        <Text fontSize="xs">2:09</Text>
                    </Box>
                    <Box width="80%">
                        <RangeSlider
                            aria-label={['min', 'max']}
                            step={0.1}
                            min={0}
                            max={311}
                            defaultValue={[30, 80]}
                            id="player-range"
                        >
                            <RangeSliderTrack bg="#F3F4F6">
                                <RangeSliderFilledTrack bg="#283346" />
                            </RangeSliderTrack>
                            <RangeSliderThumb index={0} />
                        </RangeSlider>
                    </Box>
                    <Box width="10%" textAlign="right">
                        <Text fontSize="xs">5:11</Text>
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
};
export default Player;
