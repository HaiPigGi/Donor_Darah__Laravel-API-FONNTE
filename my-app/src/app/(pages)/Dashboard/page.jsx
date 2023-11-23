// "use client";
import DashboardLayout from "./DashboardLayout";
import  HeroSection from "./HeroSection";
import  TutorialSingkatSection from "./TutorialSingkatSection";
import  InformasiPendonorSection from "./InfomasiPendonorSection";
import ArticleSection from "./ArticleSection";
import Footer from "@/_components/footer";



export default function Dashboard() {
  return (
    <DashboardLayout>
      <HeroSection/>
      <TutorialSingkatSection />
      <InformasiPendonorSection />
      <ArticleSection />
      <Footer/>
    </DashboardLayout>
  )
}


