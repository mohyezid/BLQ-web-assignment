import Container from "@/components/Component";
import SliderBanner from "@/components/home/Banner";
import FirstItem from "@/components/home/FirstItem";
import SliderIcons from "@/components/home/SliderIcons";
import Image from "next/image";

export default async function Home() {
  const res = await fetch("https://api.testvalley.kr/main-banner/all");
  const data = await res.json();
  const response = await fetch("https://api.testvalley.kr/main-shortcut/all");
  const icons = await response.json();
  return (
    <Container>
      <SliderBanner banners={data} />
      <SliderIcons shortcuts={icons} />
      <FirstItem />
    </Container>
  );
}
