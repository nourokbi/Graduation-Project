/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import Table from "../../../components/ui/Table";
import EditIndexModal from "./EditIndexModal";

export default function Indices() {
  const SECTOR_URL = "http://127.0.0.1:5000/sectors";
  const [sectorNames, setSectorNames] = useState([]);
  const [sectorIndices, setSectorIndices] = useState([]);
  const [loading, setLoading] = useState(false);

  const indicesHeader = ["Index", "Index Name", "Moderate Range", "Actions"];
  const onEditIndex = async () => {
    await fetchSectors();
  };

  const fetchSectors = async () => {
    setLoading(true);
    try {
      const response = await fetch(SECTOR_URL, { method: "GET" });

      if (!response.ok) {
        throw new Error("Error Fetching Sectors with code: ", response.status);
      }
      const sectors = await response.json();
      // Converts response to array of sector names and indices
      setSectorNames(extractSectorNames(sectors));
      setSectorIndices(extractSectorIndices(sectors));
    } catch (error) {
      console.error("There was a problem fetching data:", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchSectors();
  }, []);

  const extractSectorNames = (sectors) => {
    return Object.values(sectors).map((sector) => sector.sector_name);
  };

  const extractSectorIndices = (sectors) => {
    return Object.values(sectors).map((sector) => sector.indexes);
  };

  const extractIndiciesData = (indicies) => {
    return Object.values(indicies).map((index) => {
      const [start, end] = index.moderate_range;
      return [index.index_code, index.index_name, `${start} - ${end}`];
    });
  };

  const extractIndiciesIDs = (indicies) => {
    return Object.values(indicies).map((index) => [index.index_code]);
  };

  const [openedItems, setOpenedItems] = useState([]); // Array to store opened item indexes

  // Function to handle accordion item open/close events
  const handleOpenChange = (index, open) => {
    // Update openedItems state with the toggled index
    setOpenedItems((prevItems) => {
      if (open) {
        return [...prevItems, index]; // Add index to openedItems if opened
      }
      return prevItems.filter((item) => item !== index); // Remove index if closed
    });
  };

  return (
    <div className="indices">
      <h1>Indices</h1>
      <p>View and edit indices threshold</p>
      {!loading ? (
        <Accordion>
          {sectorNames?.map((sector, index) => (
            <AccordionItem
              key={index}
              title={sector}
              className="sector-table"
              open={openedItems.includes(index)} // Set open state based on openedItems
              onOpenChange={(open) => handleOpenChange(index, open)} // Handle open/close events
            >
              {Object.keys(sectorIndices[index]).length > 0 ? (
                <Table
                  data={extractIndiciesData(sectorIndices[index])}
                  ids={extractIndiciesIDs(sectorIndices[index])}
                  actions={[
                    (props) => (
                      <EditIndexModal
                        {...props}
                        onEdit={onEditIndex}
                        sector={sector}
                      />
                    ),
                  ]}
                  header={indicesHeader}
                />
              ) : (
                <div>No indices for this sector</div>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </div>
  );
}
