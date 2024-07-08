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
  const [availableIndexes, setAvailableIndexes] = useState([]);
  const [codedIndexes, setCodedIndexes] = useState([]);

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

  const fetchCodedIndexes = async () => {
    try {
      const response = await fetch(`http://localhost:5000/available_indexes`, {
        method: "GET",
      });

      const data = await response.json();
      setCodedIndexes(data);
    } catch (error) {
      console.error("Error fetching indexes: ", error);
    }
  };

  // const extractSectorNames = (sectors) => {
  //   return Object.values(sectors).map((sector) => sector.sector_name);
  // };

  // Function to find intersecting indexes
  // const findIntersectingIndexes = (datasets, sectors, availableIndexes) => {
  //   const datasetIndexes = datasets?.flatMap(
  //     (dataset) => dataset.available_indexes
  //   );

  //   // Initialize an object to store intersecting indexes for each sector
  //   const intersectingIndexes = {};

  //   // Iterate over each sector
  //   for (const sectorKey of Object.keys(sectors)) {
  //     const sector = sectors[sectorKey];
  //     intersectingIndexes[sectorKey] = {};

  //     // Iterate over each index in the sector
  //     for (const indexKey of Object.keys(sector.indexes)) {
  //       const index = sector.indexes[indexKey];

  //       // Check if the index code is in both the dataset indexes and available indexes
  //       if (
  //         availableIndexes.includes(index.index_code) &&
  //         datasetIndexes.includes(index.index_code)
  //       ) {
  //         intersectingIndexes[sectorKey] = {
  //           index_code: index.index_code,
  //           index_name: index.index_name,
  //         };
  //       }
  //     }
  //   }

  //   return intersectingIndexes;
  // };

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
    console.log("sectors: ", sectors);
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
