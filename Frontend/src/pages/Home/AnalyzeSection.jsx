import Map from "../../components/ui/Map";

export default function AnalyzeSection() {
  const zoom = 5;
  const center = [27.005, 30.23];

  const handleClick = () => {
    window.location.href = "/analyze";
  };
  return (
    <section className="analyze-section-container">
      <div className="container">
        <div className="analyze-section">
          <div className="analyze-info">
            <h2>Region selection and Weather indicies</h2>
            <p>
              We provide a weather indicies with the ability to select the
              region of interest and weather databases to start analyzong it{" "}
              <br /> <br />
              Our solution is designed to help you make better decisions and
              improve your weather analysis process, This can be achieved by
              offering a set Datasets and weather indicies and give analysts and
              admin the ability to upload their own datasets and analyze it.

            </p>
            <button
              className="analyze-btn green-analyze-btn"
              onClick={handleClick}
            >
              Start Analyze
            </button>
          </div>
          <div className="analyze-img">
            <Map
              zoom={zoom}
              center={center}
              className={"analyze-section-map"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
