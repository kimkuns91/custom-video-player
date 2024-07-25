import "video.js/dist/video-js.css";
import '@/styles/custom-videojs.css';
import 'videojs-mobile-ui/dist/videojs-mobile-ui.css';
import 'videojs-mobile-ui';

import React, { FC, useEffect, useRef } from "react";

import type Player from "video.js/dist/types/player";
import videojs from "video.js";

interface VideoJSProps {
  options: any;
  onReady?: (player: Player) => void;
  isMobile: boolean;
}
// Player 타입 확장
interface PlayerWithMobileUI extends Player {
  mobileUi: () => void;
}

export const VideoJS: FC<VideoJSProps> = ({ options, onReady, isMobile }) => {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<PlayerWithMobileUI | null>(null);

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
      }) as PlayerWithMobileUI);

      if (isMobile) {
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
    <div data-vjs-player className="w-full h-screen max-h-screen flex items-center justify-center bg-black">
      <div ref={videoRef} className="w-full" />
    </div>
  );
};

export default VideoJS;
