import AboutSection from "./AboutSection";
import AnalyzeSection from "./AnalyzeSection";
import DashboardSection from "./DashboardSection";
import IntroSection from "./IntroSection";

export default function Home() {
  return (
    <div className="homepage">
      <IntroSection />
      <AnalyzeSection />
      <DashboardSection />
      <AboutSection />
    </div>
  );
}
