import axios from "axios";
import React, { useState } from "react";
import { Map, Marker, Popup } from "react-map-gl";

export default function MapBox() {
  const [viewport, setViewport] = useState({
    latitude: 16.060034379945296,
    longitude: 108.20939887509337,
    zoom: 16,
  });

  const [showPopup, setShowPopup] = useState(true);

  const handleTogglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleMoveMap = (viewport) => {
    setViewport(viewport);
  };

  return (
    <Map
      {...viewport}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onMove={(e) => handleMoveMap()}
      mapboxAccessToken="pk.eyJ1IjoidGhhaXJ5byIsImEiOiJjbDc4YWI5b3owN3U2M29zOXVvYnB3amw4In0.XEiN9BrQ_IMtm9c3TAcJYQ"
    >
      <Marker
        latitude={16.060034379945296}
        longitude={108.20939887509337}
        anchor="bottom"
      >
        <img
          style={{ height: 50, width: 50 }}
          onClick={handleTogglePopup}
          src="https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png"
          alt="marker"
        />
        {showPopup && (
          <Popup
            longitude={108.209398875}
            latitude={16.060034379}
            anchor="top-right"
          >
            You are here
          </Popup>
        )}
      </Marker>
    </Map>
  );
}
