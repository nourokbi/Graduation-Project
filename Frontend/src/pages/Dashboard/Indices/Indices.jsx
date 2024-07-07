/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import Table from "../../../components/ui/Table";
import EditIndexModal from "./EditIndexModal";

export default function Indices() {
  const SECTOR_URL = "http://127.0.0.1:5000/sectors";
  const [sectorIndices, setSectorIndices] = useState([]);
  const [sectorNames, setSectorNames] = useState([]);
  const [loading, setLoading] = useState(false);

  const header = ["Index", "Index Name", "Moderate Range", "Actions"];
  const onEdit = async () => {
    await fetchData();
  };

  const fetchData = async () => {
    setLoading(true);
    // Fetch data here
    try {
      const response = await fetch(SECTOR_URL, { method: "GET" });

      if (!response.ok) {
        throw new Error("Error Fetching Data with code: ", response.status);
      }
      const sectors = await response.json();
      setSectorNames(extractSectorNames(sectors));
      setSectorIndices(extractSectorIndices(sectors));
      setLoading(false);
    } catch (error) {
      console.error("There was a problem fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
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

  return (
    <div className="indices">
      <h1>Indices</h1>
      <p>View and edit indices threshold</p>
      {!loading ? (
        <Accordion>
          {sectorNames?.map((sector, index) => (
            <AccordionItem key={index} title={sector} className="sector-table">
              {Object.keys(sectorIndices[index]).length > 0 ? (
                <Table
                  data={extractIndiciesData(sectorIndices[index])}
                  ids={extractIndiciesIDs(sectorIndices[index])}
                  actions={[
                    (props) => (
                      <EditIndexModal
                        {...props}
                        onEdit={onEdit}
                        sector={sector}
                      />
                    ),
                  ]}
                  header={header}
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
