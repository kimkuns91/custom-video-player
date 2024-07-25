import type Player from "video.js/dist/types/player";

export interface PlayerWithMobileUI extends Player {
  mobileUi: () => void;
}