import React from "react";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, LatLngExpression } from "leaflet";

import { MAP_MARKER_ICON_PATH } from "../../constants/ImagePaths";

const LeafletMapStoreLocation = () => {
  const mapMarkerIcon = new Icon({
    iconUrl: MAP_MARKER_ICON_PATH,
    iconSize: [40, 40],
  });

  const position: LatLngExpression = [51.505, -0.09];

  return (
    <MapContainer center={position} zoom={13}>
      <TileLayer
        attribution="&copy; Company Name"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={mapMarkerIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMapStoreLocation;
