/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../authContext";

const AnalyzeContext = createContext();

export function useAnalyze() {
  return useContext(AnalyzeContext);
}

export function AnalyzeProvider({ children }) {
  const ALL_DATASETS_URL = `http://localhost:5000/retrieve_all_datasets`;
  const ADMIN_DATASETS_URL = `http://localhost:5000/retrieve_all_datasets/admin`;
  const { userData, loading } = useAuth();
  const [datasets, setDatasets] = useState([]);
  const [sectors, setSectorData] = useState(null);

  const fetchDatasets = async () => {
    // fetch datasets from database
    // set datasets
    if (!loading) {
      if (!userData) {
        // fetch admin datasets
        try {
          const response = await fetch(ADMIN_DATASETS_URL, { method: "GET" });
          const data = await response.json();
          setDatasets(data);
        } catch (error) {
          console.error("Error fetching datasets: ", error);
        }
      } else if (userData.access === "admin") {
        // fetch all datasets
        try {
          const response = await fetch(ALL_DATASETS_URL, { method: "GET" });
          const data = await response.json();
          setDatasets(data);
        } catch (error) {
          console.error("Error fetching datasets: ", error);
        }
      } else {
        // fetch user datasets
        try {
          const response = await fetch(
            `http://localhost:5000/retrieve_datasets/admin,${userData.access}`,
            { method: "GET" }
          );
          const data = await response.json();
          setDatasets(data);
        } catch (error) {
          console.error("Error fetching datasets: ", error);
        }
      }
    }
  };

  const fetchSectors = async () => {
    try {
      const response = await fetch(`http://localhost:5000/sectors`, {
        method: "GET",
      });
      const data = await response.json();
      setSectorData(data);
    } catch (error) {
      console.error("Error fetching sectors: ", error);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      await fetchDatasets();
      await fetchSectors();
    };

    fetchAllData();
  }, [userData]);

  const value = { datasets, sectors };

  return (
    <AnalyzeContext.Provider value={value}>{children}</AnalyzeContext.Provider>
  );
}

export default AnalyzeContext;
