import { atom } from "recoil";

export const volumeState = atom<number>({
  key: "volumeState",
  default: 1,
});

export const mutedState = atom<boolean>({
  key: "mutedState",
  default: false,
});