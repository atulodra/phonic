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
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Icon,
} from '@chakra-ui/react';
import ReactHowler from 'react-howler';
import { useEffect, useRef, useState } from 'react';
import {
    FiRepeat,
    FiChevronRight,
    FiChevronLeft,
    FiVolume2,
} from 'react-icons/fi';
import {
    HiPlayCircle,
    HiArrowsRightLeft,
    HiPauseCircle,
} from 'react-icons/hi2';
import { useStoreActions } from 'easy-peasy';
import { formatTime } from '../lib/formatters';

const Player = ({ songs, activeSong }) => {
    const [playing, setPlaying] = useState(true);
    const [index, setIndex] = useState(
        songs.findIndex((song) => song.id === activeSong.id)
    );
    const [seek, setSeek] = useState(0.0);
    const [isSeeking, setIsSeeking] = useState(false);
    const [repeat, setRepeat] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const [duration, setDuration] = useState(0.0);
    const [volume, setVolume] = useState(0.5);

    const soundRef = useRef(null);
    const repeatRef = useRef(repeat);
    const setActiveSong = useStoreActions(
        (state: any) => state.changeActiveSong
    );

    useEffect(() => {
        let timerId;

        if (playing && !isSeeking) {
            const frames = () => {
                setSeek(soundRef.current.seek());
                timerId = requestAnimationFrame(frames);
            };
            timerId = requestAnimationFrame(frames);
            return () => cancelAnimationFrame(timerId);
        }

        cancelAnimationFrame(timerId);
    }, [playing, isSeeking]);

    useEffect(() => {
        setActiveSong(songs[index]);
        setPlaying(true);
    }, [index, setActiveSong, songs, setPlaying]);

    useEffect(() => {
        repeatRef.current = repeat;
    }, [repeat]);

    const setPlaystate = (value) => {
        setPlaying(value);
    };

    const onShuffle = () => {
        setShuffle((state) => !state);
    };

    const onRepeat = () => {
        setRepeat((state) => !state);
    };

    const nextSong = () => {
        setIndex((state) => {
            if (shuffle) {
                // shuffle logic
                const next = Math.floor(Math.random() * songs.length);
                if (next === state) {
                    return nextSong();
                }
                return next;
            }
            return state === songs.length - 1 ? 0 : state + 1;
        });
    };

    const prevSong = () => {
        setIndex((state) => {
            return state ? state - 1 : songs.length - 1;
        });
    };

    const onEnd = () => {
        if (repeatRef.current) {
            setSeek(0);
            soundRef.current.seek(0);
        } else {
            nextSong();
        }
    };

    const onLoad = () => {
        const songDuration = soundRef.current.duration();
        setDuration(songDuration);
    };

    const onSeek = (e) => {
        setSeek(parseFloat(e[0]));
        soundRef.current.seek(e[0]);
    };

    const handleVolChange = (value) => {
        setVolume(value / 100);
    };

    return (
        <Box display="grid" gridTemplateColumns="repeat(5, 1fr)">
            <Box gridColumnStart="1" gridColumnEnd="5">
                <Box>
                    <ReactHowler
                        playing={playing}
                        src={activeSong?.url}
                        // src="/songs/Bipul Chettri/wildfire.mp3"
                        ref={soundRef}
                        onLoad={onLoad}
                        onEnd={onEnd}
                        // html5
                        volume={volume}
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
                            onClick={prevSong}
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
                            onClick={nextSong}
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
                            <Text fontSize="xs">{formatTime(seek)}</Text>
                        </Box>
                        <Box width="80%">
                            <RangeSlider
                                aria-label={['min', 'max']}
                                step={0.1}
                                min={0}
                                // max={311}
                                defaultValue={[30, 80]}
                                id="player-range"
                                max={duration ? duration.toFixed(2) : 0}
                                onChange={onSeek}
                                value={[seek]}
                                onChangeStart={() => setIsSeeking(true)}
                                onChangeEnd={() => setIsSeeking(false)}
                            >
                                <RangeSliderTrack bg="#F3F4F6">
                                    <RangeSliderFilledTrack bg="#c513ce" />
                                </RangeSliderTrack>
                                <RangeSliderThumb index={0} />
                            </RangeSlider>
                        </Box>
                        <Box width="10%" textAlign="right">
                            <Text fontSize="xs">{formatTime(duration)}</Text>
                        </Box>
                    </Flex>
                </Box>
            </Box>
            <Box alignSelf="center">
                <Flex marginLeft="15%" gap={5}>
                    <Icon as={FiVolume2} color="white" />
                    <Slider
                        aria-label="volume control"
                        defaultValue={50}
                        min={0}
                        max={100}
                        step={10}
                        onChange={handleVolChange}
                    >
                        <SliderTrack>
                            <SliderFilledTrack bg="#c513ce" />
                        </SliderTrack>
                        <SliderThumb boxSize={3} />
                    </Slider>
                </Flex>
            </Box>
        </Box>
    );
};
export default Player;
