/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { FeatureGroup, MapContainer, TileLayer } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

window.type = true;

export default function Map({
  center,
  zoom,
  className,
  style,
  feature = false,
  rectangleBounds,
  setRectangleBounds,
}) {
  useEffect(() => {
    const rectangles = document.querySelectorAll(".leaflet-interactive");
    if (rectangles.length > 1) {
      for (let i = 0; i < rectangles.length - 1; i++) {
        rectangles[i].remove();
      }
    }
  }, [rectangleBounds]);

  const createRectangle = (e) => {
    const { _northEast, _southWest } = e.layer.getBounds();
    const bounds = [
      [_northEast.lat, _northEast.lng],
      [_southWest.lat, _southWest.lng],
    ];
    setRectangleBounds(bounds);
  };
  const handleEditRectangle = (e) => {
    e.layers.eachLayer((layer) => {
      const { _northEast, _southWest } = layer.getBounds();
      const bounds = [
        [_northEast.lat, _northEast.lng],
        [_southWest.lat, _southWest.lng],
      ];
      setRectangleBounds(bounds);
    });
  };
  const handleDeleteRectangle = () => {
    setRectangleBounds(null);
  };
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className={className}
      style={style}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {feature ? (
        <FeatureGroup>
          <EditControl
            position="topright"
            draw={{
              rectangle: true,
              marker: false,
              polyline: false,
              circle: false,
              circlemarker: false,
              polygon: false,
            }}
            onCreated={createRectangle}
            onEdited={handleEditRectangle}
            onDeleted={handleDeleteRectangle}
          />
        </FeatureGroup>
      ) : null}
    </MapContainer>
  );
}
