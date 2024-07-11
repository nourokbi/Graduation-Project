/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import AnalyzeForm from "./AnalyzeForm";
import AnalyzeMap from "./AnalyzeMap";
import OutputModal from "../../components/Modals/OutputModal";
import { Button, useDisclosure } from "@nextui-org/react";
import { FaEye } from "react-icons/fa";
import LayeredMap from "./LayeredMap";

export default function Analyze() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [showOutput, setShowOutput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageBase64, setImageBase64] = useState("");
  const [timeChart, setTmeChart] = useState("");
  const [govGeo, setGovGeo] = useState("");
  const [sectorGeo, setSectorGeo] = useState(""); //[{"type":"Feature","properties":{"name":"Cairo"},"geometry":{"type":"Polygon","coordinates":[[[
  const [outputText, setOutputText] = useState({});
  const [indexIndicationData, setIndexIndicationData] = useState({});
  const [showTimeChart, setShowTimeChart] = useState(false); //[{"type":"Feature","properties":{"name":"Cairo"},"geometry":{"type":"Polygon","coordinates":[[[
  const ANALYZE_URL = `http://localhost:5000/plot_firebase`;

  const buttonText = (
    <>
      <FaEye size={20} /> Show Output
    </>
  );

  const fetchData = async (data) => {
    setShowOutput(false);
    setIsLoading(true);

    setIndexIndicationData({
      sector: data.sector,
      index_code: data.index,
    });

    const requestBody = {
      dataset_id: data.dataset,
      access: data.access,
      start_date: data.timeZone.start,
      end_date: data.timeZone.end,
      season: "annual",
      index_name: data.index,
      var_name: data.variableName,
      data_type: data.type,
      governrate: [data.governrate],
      sector: data.sector,
    };
    // console.log("requestBody: ", requestBody);
    try {
      const response = await fetch(ANALYZE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Error Analyzing Inputs! ", response.error);
      }

      const data = await response.json();
      setImageBase64(data.image);
      setTmeChart(data.time_chart);
      setGovGeo(data.gov_geo);
      setSectorGeo(data.sector_geo);
      setShowOutput(true);
    } catch (error) {
      console.error("Error:", error);
    }
    setIsLoading(false);
  };

  const fetchOutputIndications = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/get_index/${indexIndicationData?.sector}/${indexIndicationData?.index_code}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error Fetching Output Indications! ", response.error);
      }

      const data = await response.json();
      setOutputText({
        highIndicator: data.high_index_indication,
        lowIndicator: data.low_index_indication,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // if (imageBase64 && outputText) {
    //   setShowOutput(true);
    // }

    if (showOutput) {
      fetchOutputIndications();
    }
  }, [showOutput]);

  const handleSaveImage = () => {
    const link = document.createElement("a");
    showTimeChart
      ? (link.href = "data:image/jpeg;base64," + timeChart)
      : (link.href = "data:image/jpeg;base64," + imageBase64);
    showTimeChart
      ? (link.download = "time_chart.jpeg")
      : (link.download = "map_plot.jpeg");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="analyze">
      <div className="container">
        <div className="analyze-container">
          <AnalyzeForm
            fetchData={fetchData}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
          {/* <LayeredMap /> */}
          <AnalyzeMap govGeo={govGeo} sectorGeo={sectorGeo} />
          {showOutput && (
            <OutputModal
              buttonText={buttonText}
              buttonStyle="output-modal-btn green-analyze-btn"
              header="Analyze output"
              isOpen={isOpen}
              onOpen={onOpen}
              onOpenChange={onOpenChange}
              // outputText={outputText}
              size="xl"
            >
              <div className="chart-group">
                {showTimeChart ? (
                  <img
                    src={"data:image/jpeg;base64," + timeChart}
                    alt="Time Chart Image"
                    className="output-img"
                  />
                ) : (
                  <img
                    src={"data:image/jpeg;base64," + imageBase64}
                    alt="Plot Image"
                    className="output-img"
                  />
                )}
              </div>
              {timeChart && (
                <button
                  onClick={() => setShowTimeChart(!showTimeChart)}
                  className={`time-chart-btn ${showTimeChart && "active"}`}
                >
                  Show Time Chart
                </button>
              )}
              <div className="output-text">
                <h3>Output Indications</h3>
                <p>
                  <span> High Indicator: </span> <br />{" "}
                  {outputText.highIndicator}
                </p>
                <br />
                <p>
                  <span> Low Indicator: </span> <br />
                  {outputText.lowIndicator}
                </p>
              </div>
              <div className="output-action-btns">
                <Button className="red-btn" onClick={onClose}>
                  Close
                </Button>
                <Button className="green-analyze-btn" onClick={handleSaveImage}>
                  Save Image
                </Button>
              </div>
            </OutputModal>
          )}
        </div>
      </div>
    </div>
    // </div>
  );
}
