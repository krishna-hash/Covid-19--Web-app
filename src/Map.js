import React from "react";
import { Map as Lily, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import { pops } from "./Sorting";

function Map({ data, casetype, center, zoom }) {
  return (
    <div className="map">
      <Lily center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribute='&copy; <a href="https://osm.org/copyright">streepmap</a>
         contributors'
        />
        {pops(data, casetype)}
      </Lily>
    </div>
  );
}

export default Map;
