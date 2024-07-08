/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { ErrorMessage, Field, Formik, useFormik, Form } from "formik";
import { Puff } from "react-loader-spinner";
import * as Yup from "yup";
import { useAnalyze } from "../../contexts/analyzeContext";
import { useEffect, useState } from "react";
import { set } from "firebase/database";

const governrates = [
  "Alexandria",
  "Aswan",
  "Assiut",
  "Behera",
  "Beni Suef",
  "Cairo",
  "Dakahlia",
  "Damietta",
  "Fayoum",
  "Gharbia",
  "Giza",
  "Ismailia",
  "Kafr El-Shikh",
  "Kalyoubia",
  "Luxor",
  "Matrouh",
  "Menia",
  "Menoufia",
  "New Valley",
  "North Sinai",
  "Port Said",
  "Qena",
  "Red Sea",
  "Sharkia",
  "Suhag",
  "South Sinai",
  "Suez",
];

const validationSchema = Yup.object({
  dataset: Yup.string().required("Required"),
  governrate: Yup.string().required("Required"),
  index: Yup.string().required("Required"),
  sector: Yup.string().required("Required"),
  timeZone: Yup.object().shape({
    start: Yup.string()
      .required("Required")
      .test(
        "is-before-end",
        "Start date must be before end date",
        function (start) {
          const { end } = this.parent; // Accessing the end date from parent object
          if (!start || !end) return true; // If start or end date is missing, let Yup handle the required validation
          return new Date(start) < new Date(end); // Check if start date is before end date
        }
      )
      .test("time-zone-exist", "Time zone is required", function (start) {
        const { end } = this.parent;
        if (!start && !end) return false; // If both start and end dates are missing, return false
        return true; // Otherwise, return true
      }),
    end: Yup.string()
      .required("Required")
      .test(
        "is-after-start",
        "End date must be after start date",
        function (end) {
          const { start } = this.parent;
          if (!start || !end) return true;
          return new Date(end) > new Date(start); // Check if end date is after start date
        }
      ),
  }),
});

export default function AnalyzeForm({
  setAnalyzeData,
  fetchData,
  isLoading,
  setIsLoading,
}) {
  const { datasets, sectors } = useAnalyze();
  const [selectedDataset, setSelectedDataset] = useState("");
  const [selectedDatasetAccess, setSelectedDatasetAccess] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [availableIndexes, setAvailableIndexes] = useState([]);

  const getDatasetAccess = (datasetId) => {
    const dataset = datasets.find((dataset) => dataset.id === datasetId);
    return dataset?.access;
  };

  useEffect(() => {
    const fetchAvailableIndexes = async () => {
      const body = {
        dataset_id: selectedDataset,
        sector_name: selectedSector,
        access: getDatasetAccess(selectedDataset),
      };
      console.log(body);
      // Fetch available indexes
      try {
        console.log(body);
        const response = await fetch(
          "http://localhost:5000/intersect_indexes",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Ensure this header is set
            },
            body: JSON.stringify(body),
          }
        );

        if (!response.ok) {
          throw new Error(
            "Error fetching available indexes: ",
            response.status
          );
        }
        const data = await response.json();
        console.log(data);
        setAvailableIndexes((prevIndexes) => [...data]);
      } catch (error) {
        console.error("Error fetching available indexes: ", error);
      }
    };
    if (selectedDataset && selectedSector) {
      fetchAvailableIndexes();
    }
  }, [selectedDataset, selectedSector, selectedDatasetAccess]);

  const getGovernrateData = (governrate) => {};
  return (
    <div className="analyze-form">
      <Formik
        initialValues={{
          dataset: "",
          access: "",
          governrate: "",
          index: "",
          sector: "",
          timeZone: {
            start: "",
            end: "",
          },
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setIsLoading(true); // Set loading state to true (Show loading spinner
          setAnalyzeData((prevData) => {
            const newData = { ...prevData, ...values };
            fetchData(newData); // Call the fetch function with updated data
            return newData;
          });
        }}
      >
        {({ handleSubmit, handleChange, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <div className="column">
              <div className="column-item">
                <label htmlFor="dataset">Dataset</label>
                <Field
                  name="dataset"
                  placeholder="Select dataset..."
                  as="select"
                  onChange={(e) => {
                    handleChange(e);
                    setSelectedDataset(e.target.value);
                  }}
                >
                  <option value="" default>
                    Select dataset...
                  </option>
                  {datasets?.map((dataset, index) => (
                    <option key={index} value={dataset.id}>
                      {dataset.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="dataset" component="div" />
              </div>

              <div className="column-item">
                <label htmlFor="governrate">Governrate</label>
                <Field
                  name="governrate"
                  placeholder="Select governrate..."
                  as="select"
                  onChange={(e) => {
                    handleChange(e);
                    getGovernrateData(e.target.value);
                  }}
                >
                  <option value="" default>
                    Select governrate...
                  </option>
                  {governrates.map((governrate) => (
                    <option key={governrate} value={governrate}>
                      {governrate}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="governrate" component="div" />
              </div>
            </div>

            <div className="column">
              <div className="column-item">
                <label htmlFor="sector">Sector</label>
                <Field
                  name="sector"
                  placeholder="Select sector..."
                  as="select"
                  onChange={(e) => {
                    handleChange(e);
                    const sector = e.target.value;
                    setSelectedSector(sector);
                    console.log("selectedSector: ", selectedSector);
                    setFieldValue("index", ""); // Reset index field
                  }}
                >
                  <option value="" default>
                    Select sector...
                  </option>
                  {sectors && Object.entries(sectors).length > 0 ? (
                    Object.entries(sectors).map(([key, sector]) => (
                      <option key={key} value={key}>
                        {sector.sector_name}
                      </option>
                    ))
                  ) : (
                    <option>No sectors available</option>
                  )}
                </Field>
                <ErrorMessage name="sector" component="div" />
              </div>
              <div className="column-item">
                <div className="label-row">
                  <label htmlFor="index">Index</label>
                  <a href="/about#indices">!</a>
                </div>
                <Field name="index" placeholder="Select index..." as="select">
                  <option value="" default>
                    {/* asd */}
                    {selectedSector && selectedDataset
                      ? availableIndexes.length > 0
                        ? "Select index..."
                        : "No available indexes for this sector"
                      : "Please select sector and dataset first"}
                  </option>
                  {availableIndexes ? (
                    availableIndexes?.map((index, idx) => (
                      <option key={idx} value={index.index_code}>
                        {index.index_name}
                      </option>
                    ))
                  ) : (
                    <option>
                      There no available indexes, try another inputs
                    </option>
                  )}
                </Field>
                <ErrorMessage name="index" component="div" />
              </div>
            </div>

            <div className="time-zone column">
              <div className="column-item">
                <label>Time Zone</label>
                <Field
                  name="timeZone.start"
                  placeholder="Select start date..."
                  type="date"
                />
                <ErrorMessage name="timeZone.start" component="div" />
              </div>
              <div className="column-item">
                <label>
                  <br />
                </label>
                <Field
                  name="timeZone.end"
                  placeholder="Select end date..."
                  type="date"
                />
                <ErrorMessage name="timeZone.end" component="div" />
              </div>
            </div>
            <div className="column">
              <div className="column-item full-width">
                <button
                  type="submit"
                  className="green-analyze-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Puff
                      visible={true}
                      height="30"
                      width="30"
                      color="#4fa94d"
                      ariaLabel="puff-loading"
                    />
                  ) : null}
                  Analyze
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
