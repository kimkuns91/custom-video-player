import BackIcon from "@/icons/BackIcon";
import BackwardIcon from "@/icons/BackwardIcon";
import EpisodeIcon from "@/icons/EpisodeIcon";
import ForwardIcon from "@/icons/ForwardIcon";
import FullscreenEnterIcon from "@/icons/FullscreenEnterIcon";
import FullscreenExitIcon from "@/icons/FullscreenExitIcon";
import Link from "next/link";
import NextEpisodeIcon from "@/icons/NextEpisodeIcon";
import PauseIcon from "@/icons/PauseIcon";
import PlayIcon from "@/icons/PlayIcon";
import QualityIcon from "@/icons/QualityIcon";
import SpeedIcon from "@/icons/SpeedIcon";
import SubtitleIcon from "@/icons/SubtitleIcon";
import VolumeHighIcon from "@/icons/VolumeHighIcon";
import VolumeLowIcon from "@/icons/VolumeLowIcon";
import VolumeMuteIcon from "@/icons/VolumeMuteIcon";

export default function Home() {
  return (
    <div>
      <Link className="bg-pink-400 px-4 py-2" href={"/watch"}>보러가즈아</Link>
      <div className="flex items-center justify-center space-x-4 bg-black">
        <BackwardIcon />
        <ForwardIcon />
        <FullscreenEnterIcon />
        <FullscreenExitIcon />
        <NextEpisodeIcon />
        <PauseIcon />
        <PlayIcon />
        <VolumeHighIcon />
        <VolumeLowIcon />
        <VolumeMuteIcon />
        <BackIcon />
        <EpisodeIcon />
        <SubtitleIcon />
        <SpeedIcon />
        <QualityIcon />
      </div>
    </div>
  );
}
