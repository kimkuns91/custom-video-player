"use client";

import { FC, useEffect, useState } from "react";
import { isMobile as detectMobile, isTablet as detectTablet } from "react-device-detect";

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
    const userAgent =
      typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const isTouchDevice = ('ontouchend' in document);
    const isMobileOrTabletDevice = /iPhone|iPad|iPod|Android|Macintosh/i.test(userAgent) && isTouchDevice;

    // Combine react-device-detect with custom detection
    setIsMobileOrTablet(detectMobile || detectTablet || isMobileOrTabletDevice);
  }, []);

  const videoJsOptions = {
    autoplay: true,
    controls: false,
    responsive: true,
    fill: !isMobileOrTablet,
    fluid: isMobileOrTablet,
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

  if(isMobileOrTablet) {
    return(
      <div>
        <h1>Mobile and Tablet</h1>
      </div>
    )
  }
  return (
    <div>WEB PAGE</div>
  )
  // return (
  //   <VideoJS
  //     title={video.title}
  //     releaseDate={video.releaseDate}
  //     nextVideo={nextVideo}
  //     options={videoJsOptions}
  //     onReady={handlePlayerReady}
  //     isMobile={isMobileOrTablet} // 모바일 또는 태블릿 감지
  //   />
  // );
};

export default VideoContainer;
