import Banner from "@/components/HomePage/Banner";
import Overview from "@/components/HomePage/Overview";
import Footer from "@/components/Shared/Footer";
import Feedback from "@/components/HomePage/Feedback";
import Partnership from "@/components/HomePage/Partnership";

export default function Home() {
  return (
    <div className="">
      <Banner />
      <Overview />
      <Feedback />
      <Partnership />
      <Footer />
    </div>
  );
}
