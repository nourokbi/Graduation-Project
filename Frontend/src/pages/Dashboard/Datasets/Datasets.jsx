/* eslint-disable react-hooks/exhaustive-deps */
// import UploadModalForm from "./UploadFormModal";
import DeleteModal from "./DeleteModal";
import EditFormModal from "./EditFormModal";
import Table from "../../../components/ui/Table";
import UploadFormModal from "./UploadFormModal";
import { useAuth } from "../../../contexts/authContext";
import { useEffect, useMemo, useState } from "react";

export default function Datasets() {
  const { userData } = useAuth();
  const [datasets, setDatasets] = useState([]);
  const [datasetsIDs, setDatasetsIDs] = useState([]);
  const [loading, setLoading] = useState(false);
  // const URL_BASE = `http://127.0.0.1:5000/retrieve_all_datasets/analyst123`;
  const URL_BASE = useMemo(
    () => `http://127.0.0.1:5000/retrieve_all_datasets/${userData.access}`,
    [userData.access]
  );

  const handleDelete = (id) => {
    console.log("id", id);
    setDatasets((prev) =>
      prev.filter((dataset, index) => datasetsIDs[index] !== id)
    );
    setDatasetsIDs((prev) => prev.filter((datasetId) => datasetId !== id));
  };

  const handleUpdate = async () => {
    await fetchData();
  };

  const header = ["Dataset Name", "Type", "Author", "Actions"];

  const actions = [
    (props) => <EditFormModal {...props} onUpdate={handleUpdate} />,
    (props) => <DeleteModal {...props} onDelete={handleDelete} />,
  ];

  const destructuringData = (data) => {
    return data.map((dataset) => {
      return [
        dataset.name,
        dataset.type === "pr" ? "Percipitation" : "Temperature",
        dataset.access,
      ];
    });
  };

  const destructuringIDs = (data) => {
    return data.map((dataset) => {
      return dataset.id;
    });
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(URL_BASE, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("result", result);
      setDatasets(destructuringData(result));
      setDatasetsIDs(destructuringIDs(result));
      // Handle the response data as needed
      setLoading(false);
    } catch (error) {
      console.error("There was a problem retrieving datasets:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [URL_BASE]);

  return (
    <div className="dataset-container">
      <div className="dataset-head">
        <div className="content">
          <h1>Datasets</h1>
          <p>here you can upload, edit or delete your datasets</p>
        </div>
        <div className="upload-form">
          <UploadFormModal />
        </div>
      </div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <Table
          data={datasets}
          ids={datasetsIDs}
          actions={actions}
          header={header}
        />
      )}
    </div>
  );
}
