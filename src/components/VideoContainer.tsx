"use client";

import { FC, useEffect, useState } from "react";
import { isMobile as detectMobile, isTablet as detectTablet } from 'react-device-detect';

import Player from "video.js/dist/types/player";
import VideoJS from "./VideoJS";
import videojs from "video.js";

interface VideoContainerProps {
  video: any;
  nextVideo?: string | null;
}

const VideoContainer: FC<VideoContainerProps> = ({ video, nextVideo }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    // setIsMobile(detectMobile);
    // setIsTablet(detectTablet);
    const userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(userAgent));
  }, []);

  const videoJsOptions = {
    autoplay: true,
    controls: false,
    responsive: true,
    fluid: true,
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
      options={videoJsOptions}
      onReady={handlePlayerReady}
      isMobile={isMobile || isTablet} // 모바일 또는 태블릿 감지
    />
  );
};

export default VideoContainer;
