import VideoContainer from "@/components/VideoContainer";
import { title } from "process";

// const video = {
//   sources: [
//     {
//       src: "https://storage.googleapis.com/white_mouse_dev/videos/movies/thegarfieldmovie/thegarfieldmovie.mp4",
//       type: "video/mp4",
//     },
//   ],
//   tracks: [
//     {
//       kind: "captions",
//       src: "https://storage.googleapis.com/white_mouse_dev/videos/movies/thegarfieldmovie/thegarfieldmovie.vtt",
//       srclang: "kr",
//       label: "Korean",
//       default: true,
//     },
//   ],
// };
const video = {
  title: "아이돌 승하의 19금 AV를 찍자",
  releaseDate: new Date("2024-07-15T06:38:07.476+00:00"),
  sources: [
    {
      src: "https://storage.googleapis.com/white_mouse_dev/videos/movies/r18idolseungh/r18idolseungh.mp4",
      type: "video/mp4",
    },
  ],
};

export default function Page() {
  return <VideoContainer video={video} />;
}
