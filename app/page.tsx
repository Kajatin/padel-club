// import Hero from "./hero";
// import Events from "./events";
// import Members from "./members";
// import FAQ from "./faq";
// import Footer from "./footer";
import OutOfService from "./out-of-service";

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 max-w-xl w-full">
      <OutOfService />
      {/* <Hero />
      <Events />
      <Members />
      <FAQ />
      <Footer /> */}
    </div>
  );
}
