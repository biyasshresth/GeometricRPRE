import Contact from "@/views/homepage/Contact";
import HeroCanvas from "@/views/homepage/HeroCanvas";
import HeroSection from "@/views/homepage/HeroSection";
import OurServices from "@/views/homepage/OurServices";
import Projects from "@/views/homepage/Project";
import WhatOurClientSay from "@/views/homepage/WhatOurClientSay";
import WhyChooseUs from "@/views/homepage/WhyChooseUs";

export default function Home() {
  return (
    <div>
      <HeroCanvas />
      <HeroSection />
      <OurServices />
      <Projects />
      <WhyChooseUs />
      <WhatOurClientSay />
      <Contact />
    </div>
  );
}
