import AboutDatasets from "./AboutDatasets";
import AboutIndices from "./AboutIndices";
import AboutNavbar from "./AboutNavbar";

export default function About() {
  return (
    <div className="about">
      <AboutNavbar />
      {/* <div className="container"> */}
        <div className="about-container">
          <AboutIndices className="container" />
          <AboutDatasets className="container" />
        {/* </div> */}
      </div>
    </div>
  );
}
