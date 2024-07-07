/* eslint-disable no-unused-vars */
// import React, { useEffect } from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet.control.layers.tree';

// const LayeredMap = () => {
//   let map, geojson;
//   let selected;

//   useEffect(() => {
//     const popup = L.popup();

//     map = L.map('map', {
//       crs: L.CRS.EPSG4326,
//       center: [23.00, 82.00],
//       zoom: 3,
//       zoomControl: false
//     });

//     const satellite = L.tileLayer('https://wi.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
//       attribution: 'Source: Esri, Maxar, Earthstar Geographics, CNES/Airbus DS, USDA FSA, USGS, Getmapping, Aerogrid, IGN, IGP, and the GIS User Community'
//     }).addTo(map);

//     const hillshade = L.tileLayer('https://whi.maptiles.arcgis.com/arcgis/rest/services/World_Hillshade/MapServer/tile/{z}/{y}/{x}', {
//       attribution: 'Sources: Esri, Airbus DS, USGS, NGA, NASA, CGIAR, N Robinson, NCEAS, NLS, OS, NMA, Geodatastyrelsen, Rijkswaterstaat, GSA, Geoland, FEMA, Intermap, and the GIS user community'
//     });

//     // const base = L.layerGroup().addLayer(hillshade).addLayer(satellite);
//     const overlays = L.layerGroup();

//     const layerControl = L.control.layers().addTo(map);
//     layerControl.addBaseLayer(hillshade, "Hillshade");
//     layerControl.addBaseLayer(satellite, "Satellite");

//     const zoomBar = new L.Control.Zoom({ position: 'topleft' }).addTo(map);
//     L.control.mousePosition({ position: 'bottomleft', prefix: "lat : long" }).addTo(map);
//     L.control.scale({ position: 'bottomleft' }).addTo(map);
//     L.Control.geocoder({ position: 'topright' }).addTo(map);
//     L.control.polylineMeasure({
//       position: 'topleft',
//       unit: 'kilometres',
//       showBearings: true,
//       clearMeasurementsOnStop: false,
//       showClearControl: true,
//       // showUnitControl: true
//     }).addTo(map);

//     const measureControl = new L.Control.Measure({ position: 'topleft' });
//     measureControl.addTo(map);

//     map.addControl(L.control.search({ position: 'topleft' }));

//     const legend = () => {
//       const legendContainer = document.getElementById("legend");
//       legendContainer.innerHTML = '';
//       const layers = overlays.getLayers();

//       const head = document.createElement("h8");
//       head.appendChild(document.createTextNode("Legend"));
//       legendContainer.appendChild(head);

//       overlays.eachLayer((layer) => {
//         const layerName = document.createElement("p");
//         layerName.appendChild(document.createTextNode(layer.options.layers));
//         legendContainer.appendChild(layerName);

//         const img = new Image();
//         img.src = `http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=${layer.options.layers}`;
//         legendContainer.appendChild(img);
//       });
//     };

//     legend();

//     return () => {
//       map.remove();
//     };
//   }, []);

//   const query = () => {
//     const table = document.getElementById("table");
//     table.innerHTML = '';

//     if (geojson) {
//       map.removeLayer(geojson);
//     }

//     const layer = document.getElementById("layer").value;
//     const attribute = document.getElementById("attributes").value;
//     const operator = document.getElementById("operator").value;
//     let value = document.getElementById("value").value;

//     if (operator === 'ILike') {
//       value = `'${value}%25'`;
//     }

//     const url = `http://localhost:8080/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=${layer}&CQL_FILTER=${attribute}%20${operator}%20${value}&outputFormat=application/json`;

//     fetch(url)
//       .then(response => response.json())
//       .then(data => {
//         geojson = L.geoJson(data, {
//           onEachFeature: onEachFeature
//         });
//         geojson.addTo(map);
//         map.fitBounds(geojson.getBounds());

//         const col = ['id'];
//         data.features.forEach(feature => {
//           Object.keys(feature.properties).forEach(key => {
//             if (!col.includes(key)) {
//               col.push(key);
//             }
//           });
//         });

//         const table = document.createElement("table");
//         table.setAttribute("class", "table table-hover table-striped");
//         table.setAttribute("id", "table");

//         const caption = document.createElement("caption");
//         caption.style.captionSide = 'top';
//         caption.innerHTML = `${layer} (Number of Features : ${data.features.length})`;
//         table.appendChild(caption);

//         const tr = table.insertRow(-1);
//         col.forEach(colName => {
//           const th = document.createElement("th");
//           th.innerHTML = colName;
//           tr.appendChild(th);
//         });

//         data.features.forEach((feature, index) => {
//           const tr = table.insertRow(-1);
//           col.forEach(colName => {
//             const tabCell = tr.insertCell(-1);
//             tabCell.innerHTML = colName === 'id' ? feature.id : feature.properties[colName];
//           });
//         });

//         const divContainer = document.getElementById("table_data");
//         divContainer.innerHTML = "";
//         divContainer.appendChild(table);

//         addRowHandlers();
//         map.invalidateSize();
//       });
//   };

//   const onEachFeature = (feature, layer) => {
//     layer.on('click', (e) => {
//       if (selected) {
//         geojson.resetStyle(selected);
//       }
//       selected = e.target;
//       selected.setStyle({ 'color': 'red' });

//       if (feature) {
//         const table = document.getElementById('table');
//         const rows = table.getElementsByTagName('tr');
//         const heads = table.getElementsByTagName('th');
//         let colNo;

//         for (let i = 0; i < heads.length; i++) {
//           if (heads[i].innerHTML === 'id') {
//             colNo = i + 1;
//             break;
//           }
//         }

//         const rowNo = findRowNumber(colNo, feature.id);
//         rows[rowNo].scrollIntoView({ behavior: 'smooth', block: 'center' });
//         highlightRow(colNo, feature.id);
//       }
//     });
//   };

//   const findRowNumber = (colNo, value) => {
//     const table = document.getElementById('table');
//     const rows = table.getElementsByTagName('tr');
//     let rowNo = -1;

//     for (let i = 1; i < rows.length; i++) {
//       if (rows[i].getElementsByTagName('td')[colNo - 1].textContent === value) {
//         rowNo = i;
//         break;
//       }
//     }
//     return rowNo;
//   };

//   const highlightRow = (colNo, value) => {
//     const rows = document.getElementById('table').getElementsByTagName('tr');

//     Array.from(rows).forEach(row => {
//       row.style.backgroundColor = row.getElementsByTagName('td')[colNo - 1].textContent === value ? 'grey' : 'white';
//     });
//   };

//   const addRowHandlers = () => {
//     const rows = document.getElementById("table").rows;
//     const heads = document.getElementsByTagName('th');
//     let colNo;

//     for (let i = 0; i < heads.length; i++) {
//       if (heads[i].innerHTML === 'id') {
//         colNo = i + 1;
//         break;
//       }
//     }

//     for (let i = 0; i < rows.length; i++) {
//       rows[i].onclick = () => {
//         if (geojson) {
//           geojson.resetStyle();
//         }
//         const cell = rows[i].cells[colNo - 1];
//         const id = cell.innerHTML;
//         highlightRow(colNo, id);

//         const features = geojson.getLayers();
//         features.forEach(feature => {
//           if (feature.feature.id === id) {
//             selected = feature;
//             selected.setStyle({ 'color': 'red' });
//             map.fitBounds(selected.getBounds());
//           }
//         });
//       };
//     }
//   };

//   return (
//     <div>
//       <div id="map" style={{ height: '100vh' }}></div>
//       <div id="legend"></div>
//       <div id="table_data"></div>
//       <select id="layer"></select>
//       <select id="attributes"></select>
//       <select id="operator"></select>
//       <input id="value" type="text" />
//       <button onClick={query}>Query</button>
//     </div>
//   );
// };

// export default LayeredMap;
import "leaflet.control.layers.tree";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-mouse-position";
import "leaflet-measure";
import "leaflet-measure/dist/leaflet-measure.css";
import "leaflet-control-geocoder";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";

const LayeredMap = () => {
  const mapRef = useRef(null);
  const geojsonRef = useRef(null);
  const selectedRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      return;
    }

    const mapContainer = document.getElementById("map");

    if (!mapContainer._leaflet_id) {
      const map = L.map(mapContainer, {
        crs: L.CRS.EPSG4326,
        center: [27.005, 30.23],
        zoom: 5,
        zoomControl: false,
      });

      const satellite = L.tileLayer(
        "https://wi.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      ).addTo(map);

      const hillshade = L.tileLayer(
        "https://whi.maptiles.arcgis.com/arcgis/rest/services/World_Hillshade/MapServer/tile/{z}/{y}/{x}"
      );

      const base = L.layerGroup().addLayer(hillshade).addLayer(satellite);
      const overlays = L.layerGroup();

      const layerControl = L.control.layers().addTo(map);
      layerControl.addBaseLayer(hillshade, "Hillshade");
      layerControl.addBaseLayer(satellite, "Satellite");

      const zoomBar = new L.Control.Zoom({ position: "topleft" }).addTo(map);
      L.control
        .mousePosition({ position: "bottomleft", prefix: "lat : long" })
        .addTo(map);

      // const geocoder = L.Control.Geocoder.nominatim();
      // const geocoderControl = L.Control.geocoder({ geocoder: geocoder }).addTo(
      //   map
      // );
      // map.addControl(geocoderControl);

      mapRef.current = map;
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div id="map" className="map"></div>;
};

export default LayeredMap;
