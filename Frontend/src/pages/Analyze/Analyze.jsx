import AnalyzeForm from "./AnalyzeForm";
import AnalyzeMap from "./AnalyzeMap";

export default function Analyze() {
  return (
    <div className="background-container">
      <div className="container">
        <div className="analyze-container">
          <AnalyzeForm />
          <AnalyzeMap />
        </div>
      </div>
    </div>
  );
}
