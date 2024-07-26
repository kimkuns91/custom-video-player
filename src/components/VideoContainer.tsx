"use client";

import { FC, useEffect, useState } from "react";
import { isMobile, isTablet } from "react-device-detect";

import Player from "video.js/dist/types/player";
import VideoJS from "./VideoJS";
import videojs from "video.js";

interface VideoContainerProps {
  video: any;
  nextVideo?: string | null;
}

const VideoContainer: FC<VideoContainerProps> = ({ video, nextVideo }) => {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    setIsMobileOrTablet(isMobile || isTablet);
  }, []);

  const videoJsOptions = {
    autoplay: true,
    controls: false,
    responsive: true,
    fill: true,
    sources: video.sources,
    tracks: video.tracks,
  };

  const handlePlayerReady = (player: Player) => {
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  return (
    <VideoJS
      title={video.title}
      releaseDate={video.releaseDate}
      nextVideo={nextVideo}
      options={videoJsOptions}
      onReady={handlePlayerReady}
      isMobile={isMobileOrTablet} // 모바일 또는 태블릿 감지
    />
  );
};

export default VideoContainer;
