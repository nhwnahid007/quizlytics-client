import Banner from "@/components/HomePage/Banner";
import Overview from "@/components/HomePage/Overview";
import Footer from "@/components/Shared/Footer";
import Feedback from "@/components/HomePage/Feedback";
import Partnership from "@/components/HomePage/Partnership";
import Faq from "@/components/HomePage/Faq";
import HelloTeacher from "@/components/HomePage/HelloTeacher";

export default function Home() {
  return (
    <div className="">
      <Banner />
      <HelloTeacher></HelloTeacher>
      <Overview />
      <Feedback />
      <Partnership />
      <Faq />
    </div>
  );
}
