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
  const [showOutput, setShowOutput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [imageBase64, setImageBase64] = useState("");

  const buttonText = (
    <>
      <FaEye size={20} /> Show Output
    </>
  );

  const fetchData = (data) => {
    setShowOutput(false);
    const startDate = new Date(data.timeZone.start);
    const endDate = new Date(data.timeZone.end);

    // Extract years
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();

    const requestBody = {
      file_path:
        "E:/NourOkbi/College/Graduation Project/Data/indices files/max_pr_monthly_RCP45.nc",
      var_name: "pr",
      start_year: startYear,
      end_year: endYear,
      season: "annual",
      index_name: data.index,
      data_type: "temp",
    };

    if (data.rectangleBounds && data.rectangleBounds.length === 2) {
      requestBody.lon1 = data.rectangleBounds[0][1];
      requestBody.lat1 = data.rectangleBounds[0][0];
      requestBody.lon3 = data.rectangleBounds[1][1];
      requestBody.lat3 = data.rectangleBounds[1][0];
    }

    console.log("requestBody: ", requestBody);

    fetch("http://127.0.0.1:5000/plot_local", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error Fetching Data! ", response.statusCode);
        }
        return response.json();
      })
      .then((data) => {
        setImageBase64(data.image);
        setShowOutput(true);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false); // Set loading state to false in case of an error
      });
  };

  useEffect(() => {
    if (
      analyzeData?.timeZone?.start &&
      analyzeData?.timeZone?.end &&
      analyzeData.index
    ) {
      fetchData(analyzeData);
      setIsLoading(false);
    }
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
              size="xl"
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
