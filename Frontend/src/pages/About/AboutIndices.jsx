/* eslint-disable react/prop-types */
import { tempIndices, precipIndices, wavesIndices } from "./indicesData";

export default function AboutIndices({ className }) {
  return (
    <section className={`about-indices ${className}`} id="indices">
      <h1>Indices</h1>
      <p>
        The project offers a range of climate extremes indices. These indices
        are annual or monthly statistics of modelled or observed climate data.
        Here you can find descriptions and formulae for each of the indices.
      </p>
      <div className="quick-links">
        <h2>Quick Links</h2>
        <div className="links">
          <div className="heat-cold">
            <h3>Heat and Cold</h3>
            <ul>
              {tempIndices.map((index) => (
                <li key={index.id}>
                  <a href={`#${index.id}`}>{index.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="precip">
            <h3>Precipitation</h3>
            <ul>
              {precipIndices.map((index) => (
                <li key={index.id}>
                  <a href={`#${index.id}`}>{index.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="waves">
            <h3>Heat and Cold Waves</h3>
            <ul>
              {wavesIndices.map((index) => (
                <li key={index.id}>
                  <a href={`#${index.id}`}>{index.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="indices-cards">
        {tempIndices.map((index) => (
          <div id={index.id} key={index.id} className="index-card">
            <h3>{index.name}</h3>
            <div className="description">{index.description}</div>
          </div>
        ))}
        {precipIndices.map((index) => (
          <div id={index.id} key={index.id} className="index-card">
            <h3>{index.name}</h3>
            <div className="description">{index.description}</div>
          </div>
        ))}
        {wavesIndices.map((index) => (
          <div id={index.id} key={index.id} className="index-card">
            <h3>{index.name}</h3>
            <div className="description">{index.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
