/* eslint-disable no-unused-vars */
import Map from "../../components/Map";

const center = [27.005, 30.23];
const zoom = 6;

const MapWithResizableRectangle = () => {
  return (
    <Map
      zoom={zoom}
      center={center}
      style={{ height: "500px" }}
      className={"map"}
      feature={true}
    />
  );
};

export default MapWithResizableRectangle;
