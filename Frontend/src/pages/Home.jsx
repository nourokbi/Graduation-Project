import Btn from "../components/Btn";
import Map from "../components/Map";
import { Modal } from "../components/Modal";

export default function Home() {
  const zoom = 4;
  const center = [27.005, 30.23];

  const handleClick = () => {
    window.location.href = "/analyze";
  };

  return (
    <div>
      <div className="home-bg-image bg-image"></div>
      <div className="container">
        <section className="intro-section">
          <h1>
            Climate <span>Insight</span> Pro
          </h1>
          <p>
            The solution for weather Decision-makers <br /> and Analysts
          </p>
        </section>
        <div>
          <Modal header={<div>Hello Modal</div>} body={<Btn/>} footer={<Btn/>} />
        </div>
        <section className="analyze-section">
          <div className="analyze-info">
            <h2>Region selection and Weather indicies</h2>
            <p>
              We provide a weather indicies with the ability to select the
              region of interest and weather databases to start analyzong it{" "}
              <br /> <br />
              Our solution is designed to help you make better decisions and
              improve your weather analysis process
            </p>
            <button className="analyze-btn green-analyze-btn" onClick={handleClick}>
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
        </section>
      </div>
    </div>
  );
}
