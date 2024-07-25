"use client";

import { FC, useEffect, useState } from "react";

import Player from "video.js/dist/types/player";
import VideoJS from "./VideoJS";
import videojs from "video.js";

interface VideoContainerProps {
  video: any;
  nextVideo?: string | null;
}

const VideoContainer: FC<VideoContainerProps> = ({ video, nextVideo }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent =
      typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(userAgent));
  }, []);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
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
      isMobile={isMobile}
    />
  );
};

export default VideoContainer;
