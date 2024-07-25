import { FaArrowLeft, FaExpand, FaPause, FaPlay, FaStepBackward, FaStepForward, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

import Player from "video.js/dist/types/player";
import React from 'react';
import ReactDOMServer from 'react-dom/server';

interface PlayerWithMobileUI extends Player {
  mobileUi: () => void;
}

export const addCustomControls = (player: PlayerWithMobileUI, options: any) => {
  // 사용자 정의 컨트롤러 추가
  const controlBar = player.getChild('controlBar');
  if (controlBar) {
    // 상단 컨트롤 바 생성
    const topControlBar = document.createElement('div');
    topControlBar.className = 'vjs-top-control-bar';

    // 뒤로가기 버튼 추가
    const backButton = document.createElement('button');
    backButton.className = 'text-white';
    backButton.onclick = () => {
      console.log('Back button clicked');
    };
    backButton.innerHTML = ReactDOMServer.renderToString(<FaArrowLeft />);
    topControlBar.appendChild(backButton);

    // 플레이어에 상단 컨트롤 바 추가
    player.el().insertBefore(topControlBar, player.el().firstChild);

    // 하단 컨트롤 바 설정
    controlBar.addClass('vjs-bottom-control-bar');

    // 하단 컨트롤 바에 버튼 추가
    const bottomControlBar = document.createElement('div');
    bottomControlBar.className = 'vjs-bottom-control-bar flex justify-between items-center w-full';

    // 10초 뒤로 버튼
    const rewindButton = document.createElement('button');
    rewindButton.className = 'vjs-control';
    rewindButton.onclick = () => {
      const currentTime = player.currentTime();
      if (currentTime !== undefined) {
        player.currentTime(currentTime - 10);
      }
    };
    rewindButton.innerHTML = ReactDOMServer.renderToString(<FaStepBackward />);
    bottomControlBar.appendChild(rewindButton);

    // 재생/일시정지 버튼
    const playToggle = controlBar.getChild('playToggle');
    if (playToggle) {
      const playButton = playToggle.el();
      playButton.classList.add('vjs-control');
      bottomControlBar.appendChild(playButton);
    }

    // 10초 앞으로 버튼
    const forwardButton = document.createElement('button');
    forwardButton.className = 'vjs-control';
    forwardButton.onclick = () => {
      const currentTime = player.currentTime();
      if (currentTime !== undefined) {
        player.currentTime(currentTime + 10);
      }
    };
    forwardButton.innerHTML = ReactDOMServer.renderToString(<FaStepForward />);
    bottomControlBar.appendChild(forwardButton);

    // 볼륨 조절 버튼
    const volumePanel = controlBar.getChild('volumePanel');
    if (volumePanel) {
      const volumeControl = volumePanel.el();
      volumeControl.classList.add('vjs-control');
      bottomControlBar.appendChild(volumeControl);
    }

    // 제목
    const title = document.createElement('div');
    title.className = 'video-title text-center mx-4 flex-grow';
    title.innerText = options.sources[0].src.split('/').pop();
    bottomControlBar.appendChild(title);

    // 다음 에피소드 버튼
    const nextEpisodeButton = document.createElement('button');
    nextEpisodeButton.className = 'next-episode-button bg-blue-500 text-white px-4 py-2 rounded';
    nextEpisodeButton.innerText = '다음 에피소드';
    nextEpisodeButton.onclick = () => {
      console.log('Next episode button clicked');
      // 다음 에피소드 로직 추가
    };
    bottomControlBar.appendChild(nextEpisodeButton);

    // 전체 화면 버튼
    const fullscreenToggle = controlBar.getChild('fullscreenToggle');
    if (fullscreenToggle) {
      const fullscreenButton = fullscreenToggle.el();
      fullscreenButton.classList.add('vjs-control');
      fullscreenButton.innerHTML = ReactDOMServer.renderToString(<FaExpand />);
      bottomControlBar.appendChild(fullscreenButton);
    }

    // 하단 컨트롤 바를 플레이어에 추가
    player.el().appendChild(bottomControlBar);
  }
};
