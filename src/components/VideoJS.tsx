import "video.js/dist/video-js.css";

import React, { FC, useEffect, useRef } from "react";

import type Player from "video.js/dist/types/player";
import mobileUi from "videojs-mobile-ui";
import videojs from "video.js";

interface VideoJSProps {
  options: any;
  onReady?: (player: Player) => void;
  isMobile: boolean;
}

export const VideoJS: FC<VideoJSProps> = ({ options, onReady, isMobile }) => {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      if (videoRef.current) {
        videoRef.current.appendChild(videoElement);
      }

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        onReady && onReady(player);
      }));

      if (isMobile) {
        // @ts-ignore
        player.mobileUi();
      }
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef, onReady, isMobile]);

  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoJS;
