/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Map from "../../components/ui/Map";

const center = [27.005, 30.23];
const zoom = 6;

const MapWithResizableRectangle = ({ analyzeData, setAnalyzeData }) => {
  const [rectangleBounds, setRectangleBounds] = useState();

  useEffect(() => {
    setAnalyzeData((analyzeData) => ({ ...analyzeData, rectangleBounds }));
  }, [rectangleBounds]);

  return (
    <Map
      zoom={zoom}
      center={center}
      style={{ height: "500px" }}
      className={"map"}
      feature={true}
      rectangleBounds={rectangleBounds}
      setRectangleBounds={setRectangleBounds}
    />
  );
};

export default MapWithResizableRectangle;
