/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import AnalyzeForm from "./AnalyzeForm";
import AnalyzeMap from "./AnalyzeMap";
import OutputModal from "../../components/Modals/OutputModal";
import { Button, useDisclosure } from "@nextui-org/react";
import { FaEye } from "react-icons/fa";
import LayeredMap from "./LayeredMap";

export default function Analyze() {
  const [analyzeData, setAnalyzeData] = useState({});
  const [showOutput, setShowOutput] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [imageBase64, setImageBase64] = useState("");
  const [geoJson, setGeoJson] = useState({});
  const [outputText, setOutputText] = useState("");
  const ANALYZE_URL = ``;

  const buttonText = (
    <>
      <FaEye size={20} /> Show Output
    </>
  );

  const fetchData = async (data) => {
    setShowOutput(false);
    setIsLoading(true);
    const startDate = new Date(data.timeZone.start);
    const endDate = new Date(data.timeZone.end);

    // Extract years
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();

    const requestBody = {
      dataset_id: data.dataset,
      var_name: data.type,
      start_year: startYear,
      end_year: endYear,
      season: "annual",
      index_name: data.index,
      data_type: data.type,
      access: data.access,
      governrate: data.governrate,
      sector: data.sector,
    };
    console.log("requestBody: ", requestBody);
    try {
      const response = await fetch(ANALYZE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Error Analyzing Inputs! ", response.statusCode);
      }

      const data = await response.json();
      setImageBase64(data.image);
      setGeoJson(data.geojson);
      setOutputText(data.text);
      setShowOutput(true);
    } catch (error) {
      console.error("Error:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // if (
    //   analyzeData?.timeZone?.start &&
    //   analyzeData?.timeZone?.end &&
    //   analyzeData.index &&
    //   analyzeData.dataset &&
    //   analyzeData.type &&
    //   analyzeData.access &&
    //   analyzeData.governrate &&
    //   analyzeData.sector
    // ) {
    //   fetchData(analyzeData);
    // }
    // console.log("analyzeData: ", analyzeData);
  }, [analyzeData]);

  const handleSaveImage = () => {
    const link = document.createElement("a");
    link.href = "data:image/jpeg;base64," + imageBase64;
    link.download = "plot_image.jpeg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="analyze">
      <div className="container">
        <div className="analyze-container">
          <AnalyzeForm
            setAnalyzeData={setAnalyzeData}
            fetchData={fetchData}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
          {/* <LayeredMap /> */}
          <AnalyzeMap setAnalyzeData={setAnalyzeData} />
          {showOutput && (
            <OutputModal
              buttonText={buttonText}
              buttonStyle="output-modal-btn green-analyze-btn"
              header="Analyze output"
              isOpen={isOpen}
              onOpen={onOpen}
              onOpenChange={onOpenChange}
              size="2xl"
            >
              <img
                src={"data:image/jpeg;base64," + imageBase64}
                alt="Plot Image"
                className="output-img"
              />
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
