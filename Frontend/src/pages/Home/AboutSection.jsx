/* eslint-disable no-unused-vars */
import { BookMarked, Database, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutSection() {
  return (
    <section className="about-section-container">
      <div className="container">
        <div className="about-section">
          <h2>About Page</h2>
          {/* <p>
            We are a team of developers who are passionate about weather data
            and its analysis. We provide a solution for weather decision-makers
            and analysts to help them make better decisions and improve their
            weather analysis process. Our solution is designed to help you make
            better decisions and improve your weather analysis process.
          </p> */}
          <p>
            About page is a page that provides information about the website and
            used indices and datasets information. also contain all the
            information about the website and the team behind it.
            <a href="/about">Find more</a>
          </p>
          <div className="about-info">
            <div className="about-info-item">
              <BookMarked size={50} />
              <h3>Indices</h3>
              <p>
                The website provides a list of indices that are used in the
                analysis process. <br />
                {/* <Link to="/about#indices">Find more</Link> */}
              </p>
            </div>
            <div className="about-info-item">
              <Database size={50} />
              <h3>Datasets</h3>
              <p>
                The website provides a list of datasets that are used in the
                analysis process. <br />
                {/* <Link to="/about/#datasets">Find more</Link> */}
              </p>
            </div>
            <div className="about-info-item">
              <User size={50} />
              <h3>Team</h3>
              <p>
                The website provides information about the team behind the
                {/* website. <br /> <Link to="/about#team">Find more</Link> */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
