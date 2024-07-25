import VideoContainer from "@/components/VideoContainer";

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
