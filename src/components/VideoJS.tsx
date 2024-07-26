import "video.js/dist/video-js.css";
import "@/styles/custom-videojs.css";
import "videojs-mobile-ui/dist/videojs-mobile-ui.css";
import "videojs-mobile-ui";

import React, { FC, useEffect, useRef, useState } from "react";

import CustomControlBar from "./CustomControlBar";
import type Player from "video.js/dist/types/player";
import { addCustomControls } from "./customControls";
import videojs from "video.js";

interface VideoJSProps {
  title: string;
  releaseDate: Date;
  options: any;
  onReady?: (player: Player) => void;
  isMobile: boolean;
  nextVideo?: string | null;
}
// Player 타입 확장
interface PlayerWithMobileUI extends Player {
  mobileUi: () => void;
}

export const VideoJS: FC<VideoJSProps> = ({
  title,
  releaseDate,
  options,
  onReady,
  isMobile,
  nextVideo,
}) => {
  const [showControls, setShowControls] = useState(false);
  const [aspectRatio, setAspectRatio] = useState("16 / 9");

  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<PlayerWithMobileUI | null>(null);
  const timerRef = useRef<number | null>(null);

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

      player.on("loadedmetadata", () => {
        const videoWidth = player.videoWidth();
        const videoHeight = player.videoHeight();
        setAspectRatio(`${videoWidth} / ${videoHeight}`);

        // 이어보기 기능: 저장된 재생 위치로 이동
        const savedTime = localStorage.getItem(
          `video-${options.sources[0].src}-time`
        );
        if (savedTime) {
          player.currentTime(parseFloat(savedTime));
        }
      });

      if (isMobile) {
        player.mobileUi();
      }
      // // 사용자 정의 컨트롤러 추가
      // addCustomControls(player, options);
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef, onReady, isMobile]);

  useEffect(() => {
    const player = playerRef.current;

    if (player) {
      const handleTimeUpdate = () => {
        const currentTime = player.currentTime();
        if (currentTime !== undefined) {
          localStorage.setItem(
            `video-${options.sources[0].src}-time`,
            currentTime.toString()
          );
        }
      };

      // 10초마다 현재 재생 위치를 저장
      const interval = setInterval(handleTimeUpdate, 10000);

      // 일시정지, 종료 시 재생 위치 저장
      player.on("pause", handleTimeUpdate);
      player.on("ended", handleTimeUpdate);

      return () => {
        clearInterval(interval);
        player.off("pause", handleTimeUpdate);
        player.off("ended", handleTimeUpdate);
      };
    }
  }, [options.sources]);

  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  useEffect(() => {
    const resetTimer = () => {
      setShowControls(true);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = window.setTimeout(() => {
        setShowControls(false);
      }, 1000);
    };

    const handleMouseMove = () => {
      resetTimer();
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen min-h-screen max-h-screen bg-black text-sm md:text-2xl focus:outline-none"
    >
      <div
        data-vjs-player
        className="relative w-full h-screen max-h-screen flex items-center justify-center bg-black scrollbar-hide"
      >
        <div
          ref={videoRef}
          className="w-full mx-auto"
          style={{
            aspectRatio,
            objectFit: "contain",
            maxHeight: "100%",
          }}
        />
      </div>
      {containerRef.current && playerRef.current && (
        <CustomControlBar
          title={title}
          releaseDate={releaseDate}
          showControls={showControls}
          container={containerRef.current}
          player={playerRef.current}
          options={options}
          nextVideo={nextVideo}
        />
      )}
    </div>
  );
};

export default VideoJS;
