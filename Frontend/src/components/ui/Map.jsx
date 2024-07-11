/* eslint-disable react/prop-types */
import { FeatureGroup, MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";

window.type = true;

export default function Map({
  center,
  zoom,
  className,
  style,
  feature = false,
  govGeo,
  sectorGeo,
}) {
  useEffect(() => {
    // This useEffect will trigger a re-render when geoJsonData or sectorGeo changes
  }, [govGeo, sectorGeo]);

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
          {govGeo && <GeoJSON data={JSON.parse(govGeo)} />}
          {sectorGeo && (
            <GeoJSON data={JSON.parse(sectorGeo)} style={{ color: "green" }} />
          )}
        </FeatureGroup>
      ) : null}
    </MapContainer>
  );
}

{
  /* <EditControl
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
/> */
}

// useEffect(() => {
//   const rectangles = document.querySelectorAll(".leaflet-interactive");
//   if (rectangles.length > 1) {
//     for (let i = 0; i < rectangles.length - 1; i++) {
//       rectangles[i].remove();
//     }
//   }
// }, [rectangleBounds]);

// const createRectangle = (e) => {
//   const { _northEast, _southWest } = e.layer.getBounds();
//   const bounds = [
//     [_northEast.lat, _northEast.lng],
//     [_southWest.lat, _southWest.lng],
//   ];
//   setRectangleBounds(bounds);
// };
// const handleEditRectangle = (e) => {
//   e.layers.eachLayer((layer) => {
//     const { _northEast, _southWest } = layer.getBounds();
//     const bounds = [
//       [_northEast.lat, _northEast.lng],
//       [_southWest.lat, _southWest.lng],
//     ];
//     setRectangleBounds(bounds);
//   });
// };
// const handleDeleteRectangle = () => {
//   setRectangleBounds(null);
// };

// const onEachFeature = (feature, layer) => {
//   // This function is called on each feature.
//   // You can bind popups or tooltips to the layer here.
//   if (feature.properties && feature.properties.popupContent) {
//     layer.bindPopup(feature.properties.popupContent);
//   }
// };
