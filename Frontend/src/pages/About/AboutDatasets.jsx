/* eslint-disable react/prop-types */
const datasets = [
  {
    id: "dataset-1",
    name: "Dataset 1",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: "dataset-2",
    name: "Dataset 2",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    indices: [{ name: "Index 1" }, { name: "Index 2" }],
  },
  {
    id: "dataset-2",
    name: "Dataset 2",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    indices: [{ name: "Index 1" }, { name: "Index 2" }],
  },
  {
    id: "dataset-2",
    name: "Dataset 2",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    indices: [{ name: "Index 1" }, { name: "Index 2" }],
  },
  {
    id: "dataset-2",
    name: "Dataset 2",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    indices: [{ name: "Index 1" }, { name: "Index 2" }],
  },
  {
    id: "dataset-2",
    name: "Dataset 2",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    indices: [{ name: "Index 1" }, { name: "Index 2" }],
  },
  {
    id: "dataset-2",
    name: "Dataset 2",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    indices: [{ name: "Index 1" }, { name: "Index 2" }],
  },
];

export default function AboutDatasets({ className }) {
  return (
    <section className="about-datasets" id="datasets">
      <div className={className}>
        <h1>Datasets</h1>
        <div className="datasets">
          {datasets.map((dataset) => (
            <div id={dataset.id} key={dataset.id} className="dataset-card">
              <h3>{dataset.name}</h3>
              <div className="description">{dataset.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
