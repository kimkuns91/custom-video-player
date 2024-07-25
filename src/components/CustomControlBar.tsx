import {
  FaArrowLeft,
  FaExpand,
  FaPause,
  FaPlay,
  FaStepBackward,
  FaStepForward,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { mutedState, volumeState } from "@/lib/state/videoAtom";

import BackwardIcon from "@/icons/BackwardIcon";
import ForwardIcon from "@/icons/ForwardIcon";
import FullscreenEnterIcon from "@/icons/FullscreenEnterIcon";
import FullscreenExitIcon from "@/icons/FullscreenExitIcon";
import { IoIosArrowRoundBack } from "react-icons/io";
import NextEpisodeIcon from "@/icons/NextEpisodeIcon";
import PauseIcon from "@/icons/PauseIcon";
import PlayIcon from "@/icons/PlayIcon";
import { PlayerWithMobileUI } from "@/types/video-js";
import VolumeHighIcon from "@/icons/VolumeHighIcon";
import VolumeLowIcon from "@/icons/VolumeLowIcon";
import VolumeMuteIcon from "@/icons/VolumeMuteIcon";
import { useRecoilState } from "recoil";

interface CustomControlBarProps {
  showControls: boolean;
  player: PlayerWithMobileUI;
  options: any;
}

const CustomControlBar: React.FC<CustomControlBarProps> = ({
  showControls,
  player,
  options,
}) => {
  const [isPlaying, setIsPlaying] = useState(!player.paused());
  const [isMuted, setIsMuted] = useRecoilState(mutedState);
  const [volumeLevel, setVolumeLevel] = useRecoilState(volumeState);
  const [isFullscreen, setIsFullscreen] = useState(player.isFullscreen());
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  useEffect(() => {
    // Initialize volume and mute state
    setIsMuted(player.muted() ?? false);
    setVolumeLevel(player.volume() ?? 1);

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onVolumeChange = () => {
      setIsMuted(player.muted() ?? false);
      setVolumeLevel(player.volume() ?? 1);
    };

    player.on("play", onPlay);
    player.on("pause", onPause);
    player.on("volumechange", onVolumeChange);

    return () => {
      player.off("play", onPlay);
      player.off("pause", onPause);
      player.off("volumechange", onVolumeChange);
    };
  }, [player, setIsMuted, setVolumeLevel]);

  const handlePlayPause = () => {
    if (player.paused()) {
      player.play();
    } else {
      player.pause();
    }
  };

  const handleSkip = (seconds: number) => {
    if (player) {
      const currentTime = player.currentTime();
      if (currentTime !== undefined) {
        player.currentTime(currentTime + seconds);
      }
    }
  };

  const handleMuteUnmute = () => {
    player.muted(!player.muted());
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value);
    setVolumeLevel(volume);
    player.volume(volume);
  };

  const handleFullscreenToggle = () => {
    if (player.isFullscreen()) {
      player.exitFullscreen();
    } else {
      player.requestFullscreen();
    }
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

  return (
    <>
      <div className="vjs-top-control-bar">
        <div className="flex justify-between items-center w-full">
          <button
            className="text-white flex items-center gap-2 hover:scale-125 transition-transform duration-200"
            onClick={() => {}}
          >
            <IoIosArrowRoundBack className="text-5xl font-bold" />
          </button>
        </div>
      </div>
      <div className="vjs-bottom-control-bar">
        <div className="flex-1 flex items-center space-x-4">
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
          <div className="volume-control">
            <button
              className="custom-control-button"
              onClick={handleMuteUnmute}
              onMouseEnter={() => setShowVolumeSlider(true)}
              onMouseLeave={() => setShowVolumeSlider(false)}
            >
              {renderVolumeIcon()}
            </button>
            {showVolumeSlider && (
              <div
                className="volume-slider"
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setShowVolumeSlider(false)}
              >
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volumeLevel}
                  onChange={handleVolumeChange}
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center space-x-4">
          <div className="text-white text-lg">
            {options.sources[0].src.split("/").pop()}
          </div>
        </div>
        <div className="flex-1 flex items-center justify-end space-x-4">
          <button
            className="custom-control-button"
            onClick={() => console.log("Next episode button clicked")}
          >
            <NextEpisodeIcon />
          </button>
          <button
            className="custom-control-button"
            onClick={handleFullscreenToggle}
          >
            {isFullscreen ? <FullscreenExitIcon /> : <FullscreenEnterIcon />}
          </button>
        </div>
      </div>
    </>
  );
};

export default CustomControlBar;
