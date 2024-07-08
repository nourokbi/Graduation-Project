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
  // const ALL_DATASETS_URL = `http://127.0.0.1:5000/retrieve_all_datasets/analyst123`;
  const ALL_DATASETS_URL = useMemo(
    () => `http://127.0.0.1:5000/retrieve_all_datasets/${userData.access}`,
    [userData.access]
  );

  const handleDeleteDataset = (id) => {
    console.log("id", id);
    setDatasets((prev) =>
      prev.filter((dataset, index) => datasetsIDs[index] !== id)
    );
    setDatasetsIDs((prev) => prev.filter((datasetId) => datasetId !== id));
  };

  const handleUpdateDataset = async () => {
    await fetchAllUserDatasets();
  };

  const datasetTableHeader = ["Dataset Name", "Type", "Author", "Actions"];

  const datasetActions = [
    (props) => <EditFormModal {...props} onUpdate={handleUpdateDataset} />,
    (props) => <DeleteModal {...props} onDelete={handleDeleteDataset} />,
  ];

  const destructuringDatasetData = (data) => {
    return data.map((dataset) => {
      return [
        dataset.name,
        dataset.type === "pr" ? "Percipitation" : "Temperature",
        dataset.access,
      ];
    });
  };

  const destructuringDatasetsIDs = (data) => {
    return data.map((dataset) => {
      return dataset.id;
    });
  };

  const fetchAllUserDatasets = async () => {
    setLoading(true);
    try {
      const response = await fetch(ALL_DATASETS_URL, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Error Fetching Datasets with code: ", response.status);
      }

      const result = await response.json();
      // Convert datasets into data that can be displayed in the table and ids for each row
      setDatasets(destructuringDatasetData(result));
      setDatasetsIDs(destructuringDatasetsIDs(result));
    } catch (error) {
      console.error("There was a problem retrieving datasets:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllUserDatasets();
  }, [ALL_DATASETS_URL]);

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
      ) : datasets.length > 0 ? (
        <Table
          data={datasets}
          ids={datasetsIDs}
          actions={datasetActions}
          header={datasetTableHeader}
        />
      ) : (
        <div className="no-data">
          No datasets available for you, <br /> Try upload dataset
        </div>
      )}
    </div>
  );
}
