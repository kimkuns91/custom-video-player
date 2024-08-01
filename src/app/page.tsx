import Hero from "@/components/Hero";
import Row from "@/components/Row";
import TodayTop10Videos from "@/components/Top10Videos";
import { getContents } from "@/lib/fetch";

export default async function Home() {
  const contents = await getContents();
  const initData = contents[0];

  return (
    <div className="w-full min-h-screen bg-black pb-20">
      <Hero sliderData={contents} initData={initData} />
      <TodayTop10Videos contents={contents} />
      <Row title="지금 뜨는 컨텐츠" contents={contents} />
    </div>
  );
}
