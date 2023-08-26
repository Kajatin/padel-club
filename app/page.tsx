import Hero from "./hero";
import Events from "./events";
import Members from "./members";
import FAQ from "./faq";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 max-w-xl w-full">
      <Hero />
      <Events />
      <Members />
      <FAQ />
    </div>
  );
}
