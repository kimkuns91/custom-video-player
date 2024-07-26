import { Direction, Range, getTrackBackground } from "react-range";
import React, { useEffect, useState } from "react";
import { format, isValid } from "date-fns";
import { mutedState, volumeState } from "@/lib/state/videoAtom";

import BackIcon from "@/icons/BackIcon";
import BackwardIcon from "@/icons/BackwardIcon";
import EpisodeIcon from "@/icons/EpisodeIcon";
import { FaCheck } from "react-icons/fa";
import ForwardIcon from "@/icons/ForwardIcon";
import FullscreenEnterIcon from "@/icons/FullscreenEnterIcon";
import FullscreenExitIcon from "@/icons/FullscreenExitIcon";
import NextEpisodeIcon from "@/icons/NextEpisodeIcon";
import PauseIcon from "@/icons/PauseIcon";
import PlayIcon from "@/icons/PlayIcon";
import { PlayerWithMobileUI } from "@/types/video-js";
import QualityIcon from "@/icons/QualityIcon";
import SpeedIcon from "@/icons/SpeedIcon";
import SubtitleIcon from "@/icons/SubtitleIcon";
import VolumeHighIcon from "@/icons/VolumeHighIcon";
import VolumeLowIcon from "@/icons/VolumeLowIcon";
import VolumeMuteIcon from "@/icons/VolumeMuteIcon";
import { cn } from "@/lib/utils";
import { usePopper } from "react-popper";
import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";

interface CustomControlBarProps {
  title: string;
  releaseDate: Date;
  showControls: boolean;
  container: HTMLDivElement;
  player: PlayerWithMobileUI;
  options: any;
  nextVideo?: string | null;
}

const CustomControlBar: React.FC<CustomControlBarProps> = ({
  title,
  releaseDate,
  showControls,
  container,
  player,
  options,
  nextVideo,
}) => {
  const [isPlaying, setIsPlaying] = useState(!player.paused());
  const [isMuted, setIsMuted] = useRecoilState(mutedState);
  const [volumeLevel, setVolumeLevel] = useRecoilState(volumeState);
  const [isFullscreen, setIsFullscreen] = useState(player.isFullscreen());
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(
    player.currentTime() || 0
  );
  const [duration, setDuration] = useState<number>(player.duration() || 0);
  const [showSubtitleOptions, setShowSubtitleOptions] = useState(false);
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(
    player.playbackRate() || 1
  );
  const [showPlayPauseIcon, setShowPlayPauseIcon] = useState<boolean>(false);

  const [subtitleReferenceElement, setSubtitleReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [subtitlePopperElement, setSubtitlePopperElement] =
    useState<HTMLDivElement | null>(null);
  const { styles: subtitleStyles, attributes: subtitleAttributes } = usePopper(
    subtitleReferenceElement,
    subtitlePopperElement,
    {
      placement: "top",
    }
  );

  const [speedReferenceElement, setSpeedReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [speedPopperElement, setSpeedPopperElement] =
    useState<HTMLDivElement | null>(null);
  const { styles: speedStyles, attributes: speedAttributes } = usePopper(
    speedReferenceElement,
    speedPopperElement,
    {
      placement: "top",
    }
  );

  const navigate = useRouter();

  useEffect(() => {
    setIsMuted(player.muted() ?? false);
    setVolumeLevel(player.volume() ?? 1);

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onVolumeChange = () => {
      setIsMuted(player.muted() ?? false);
      setVolumeLevel(player.volume() ?? 1);
    };

    const onTimeUpdate = () => setCurrentTime(player.currentTime() || 0);
    const onDurationChange = () => setDuration(player.duration() || 0);

    player.on("play", onPlay);
    player.on("pause", onPause);
    player.on("volumechange", onVolumeChange);
    player.on("timeupdate", onTimeUpdate);
    player.on("durationchange", onDurationChange);

    return () => {
      player.off("play", onPlay);
      player.off("pause", onPause);
      player.off("volumechange", onVolumeChange);
      player.off("timeupdate", onTimeUpdate);
      player.off("durationchange", onDurationChange);
    };
  }, [player, setIsMuted, setVolumeLevel]);

  const handlePlayPause = () => {
    if (player.paused()) {
      player.play();
    } else {
      player.pause();
    }
    setShowPlayPauseIcon(true);
    setTimeout(() => {
      setShowPlayPauseIcon(false);
    }, 1500);
  };

  const handleSkip = (seconds: number) => {
    if (player) {
      const currentTime = player.currentTime() || 0;
      if (currentTime !== undefined) {
        player.currentTime(currentTime + seconds);
      }
    }
  };

  const handleSeek = (values: number[]) => {
    const newTime = values[0];
    player.currentTime(newTime);
    setCurrentTime(newTime);
  };

  const handleMuteUnmute = () => {
    player.muted(!player.muted());
  };

  const handleVolumeChange = (values: number[]) => {
    const volume = values[0];
    setVolumeLevel(volume);
    player.volume(volume);
  };

  const handleFullscreenToggle = () => {
    if (container) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
        setIsFullscreen(false);
      } else {
        container.requestFullscreen();
        setIsFullscreen(true);
      }
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackRate(speed);
    player.playbackRate(speed);
  };

  const renderVolumeIcon = () => {
    if (isMuted || volumeLevel === 0) {
      return <VolumeMuteIcon />;
    } else if (volumeLevel < 0.5) {
      return <VolumeLowIcon />;
    } else {
      return <VolumeHighIcon />;
    }
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return [h, m, s]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  };

  return (
    <>
      <div
        className={cn(
          "vjs-top-control-bar",
          !isPlaying || showControls ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="flex items-center w-full space-x-4">
          <button className="custom-control-button" onClick={() => {}}>
            <BackIcon />
          </button>
          <div className="flex flex-col items-start">
            <h2 className="text-xl text-white">{title}</h2>
            <p className="text-lg text-white">
              {isValid(new Date(releaseDate))
                ? format(new Date(releaseDate), "yyyy-MM-dd")
                : "Invalid Date"}
            </p>
          </div>
        </div>
      </div>
      <div
        className="hidden lg:flex absolute top-0 left-0 w-full h-screen justify-center items-center cursor-pointer"
        onClick={handlePlayPause}
      >
        {showPlayPauseIcon && (
          <div className="w-1/6 max-w-24 bg-black/30 rounded-full p-4">
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </div>
        )}
      </div>

      <div
        className={cn(
          "vjs-bottom-control-bar",
          !isPlaying || showControls ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="progress-bar-container">
          <span className="current-time">{formatTime(currentTime)}</span>
          {duration > 0 && (
            <Range
              step={0.1}
              min={0}
              max={duration}
              values={[currentTime]}
              onChange={handleSeek}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "4px",
                    width: "100%",
                    background: getTrackBackground({
                      values: [currentTime],
                      colors: ["#f00", "#777"],
                      min: 0,
                      max: duration,
                    }),
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "12px",
                    width: "12px",
                    backgroundColor: "#f00",
                    borderRadius: "50%",
                  }}
                />
              )}
            />
          )}
          <span className="total-time">{formatTime(duration)}</span>
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="flex-1 flex items-center space-x-6">
            <button className="custom-control-button" onClick={handlePlayPause}>
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button
              className="custom-control-button"
              onClick={() => handleSkip(-10)}
            >
              <BackwardIcon />
            </button>
            <button
              className="custom-control-button"
              onClick={() => handleSkip(10)}
            >
              <ForwardIcon />
            </button>
            <div
              className="custom-control-wrapper"
              onMouseEnter={() => setShowVolumeSlider(true)}
              onMouseLeave={() => setShowVolumeSlider(false)}
            >
              <button
                className="custom-control-wrapper-button"
                onClick={handleMuteUnmute}
              >
                {renderVolumeIcon()}
              </button>
              {showVolumeSlider && (
                <div className="volume-slider">
                  <Range
                    step={0.01}
                    min={0}
                    max={1}
                    values={[volumeLevel]}
                    direction={Direction.Up}
                    onChange={handleVolumeChange}
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: "90%",
                          width: "6px",
                          background: getTrackBackground({
                            values: [volumeLevel],
                            colors: ["#f00", "#777"],
                            min: 0,
                            max: 1,
                            direction: Direction.Up,
                          }),
                        }}
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({ props }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: "14px",
                          width: "14px",
                          backgroundColor: "#f00",
                          borderRadius: "50%",
                        }}
                      />
                    )}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 flex items-center justify-end space-x-6">
            {options.tracks && (
              <div
                className="custom-control-wrapper"
                onMouseEnter={() => setShowSubtitleOptions(true)}
                onMouseLeave={() => setShowSubtitleOptions(false)}
              >
                <button
                  className="custom-control-wrapper-button"
                  ref={setSubtitleReferenceElement}
                  onClick={() => console.log("Subtitles button clicked")}
                >
                  <SubtitleIcon />
                </button>
                {showSubtitleOptions && (
                  <div
                    className="subtitle-options"
                    ref={setSubtitlePopperElement}
                    style={subtitleStyles.popper}
                    {...subtitleAttributes.popper}
                  >
                    <div>Subtitles</div>
                    <div>Korean</div>
                    <div>English</div>
                  </div>
                )}
              </div>
            )}
            <div
              className="custom-control-wrapper"
              onMouseEnter={() => setShowSpeedOptions(true)}
              onMouseLeave={() => setShowSpeedOptions(false)}
            >
              <button
                className="custom-control-wrapper-button"
                ref={setSpeedReferenceElement}
              >
                <SpeedIcon />
              </button>
              {showSpeedOptions && (
                <div
                  className="speed-options"
                  ref={setSpeedPopperElement}
                  style={speedStyles.popper}
                  {...speedAttributes.popper}
                >
                  <div className="flex-1">재생 속도</div>
                  <div className="flex-1 flex flex-col items-end space-y-2">
                    <div
                      className="flex items-center space-x-2 cursor-pointer"
                      onClick={() => handleSpeedChange(0.5)}
                    >
                      {playbackRate === 0.5 && <FaCheck />}
                      <p>0.5x</p>
                    </div>
                    <div
                      className="flex items-center space-x-2 cursor-pointer"
                      onClick={() => handleSpeedChange(0.75)}
                    >
                      {playbackRate === 0.75 && <FaCheck />}
                      <p>0.75x</p>
                    </div>
                    <div
                      className="flex items-center space-x-2 cursor-pointer"
                      onClick={() => handleSpeedChange(1)}
                    >
                      {playbackRate === 1 && <FaCheck />}
                      <p>1x (기본)</p>
                    </div>
                    <div
                      className="flex items-center space-x-2 cursor-pointer"
                      onClick={() => handleSpeedChange(1.25)}
                    >
                      {playbackRate === 1.25 && <FaCheck />}
                      <p>1.25x</p>
                    </div>
                    <div
                      className="flex items-center space-x-2 cursor-pointer"
                      onClick={() => handleSpeedChange(1.5)}
                    >
                      {playbackRate === 1.5 && <FaCheck />} <p>1.5x</p>
                    </div>
                    <div
                      className="flex items-center space-x-2 cursor-pointer"
                      onClick={() => handleSpeedChange(2)}
                    >
                      {playbackRate === 2 && <FaCheck />} <p>2x</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {nextVideo && (
              <button
                className="custom-control-button"
                onClick={() => console.log("Next episode button clicked")}
              >
                <NextEpisodeIcon />
              </button>
            )}
            {/* <button
              className="custom-control-button"
              onClick={() => console.log("Episodes button clicked")}
            >
              <EpisodeIcon />
            </button> */}
            {/* <button
              className="custom-control-button"
              onClick={() => console.log("Quality button clicked")}
            >
              <QualityIcon />
            </button> */}

            <button
              className="custom-control-button"
              onClick={handleFullscreenToggle}
            >
              {isFullscreen ? <FullscreenExitIcon /> : <FullscreenEnterIcon />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomControlBar;
