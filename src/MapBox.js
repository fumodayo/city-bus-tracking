import React, { useState, useEffect } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import { initialData } from "./actions/initialData";

export default function MapBox() {
  const [viewport, setViewport] = useState({
    latitude: 16.082620606761385,
    longitude: 108.22371699783464,
    zoom: 16,
  });

  const [showPopup, setShowPopup] = useState(false);
  const handleTogglePopup = () => {
    setShowPopup(!showPopup);
  };


  return (
    <Map
      {...viewport}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onMove={(e) => setViewport(e.viewport)}
      mapboxAccessToken="pk.eyJ1IjoidGhhaXJ5byIsImEiOiJjbDdidTBsN2EwNnNsM29vbHZvdG1obnI1In0.wMM7GfZWtSaf32bEFpBowg"
    >
      {initialData.busRoutes.map((addressm) =>
        addressm.route.map((i) => (
          <>
            <Marker
              key={i.id}
              latitude={i.location.lat}
              longitude={i.location.lng}
              anchor="bottom"
            >
              <img
                style={{ height: 50, width: 50, cursor: "pointer" }}
                onClick={handleTogglePopup}
                src="https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png"
                alt="marker"
              />
            </Marker>
            <Popup
              latitude={i.location.lat}
              longitude={i.location.lng}
              anchor="top-right"
              closeOnClick={true}
            >
              {i.name}
            </Popup>
          </>
        ))
      )}
    </Map>
  );
}
