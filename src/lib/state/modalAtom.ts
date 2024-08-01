import { Content } from "@prisma/client";
import { atom } from "recoil";

export const modalState = atom({
  key: "modalState",
  default: false,
});

export const contentState = atom<Content | null>({
  key: "contentState",
  default: null,
});