import React, { useState } from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
import { initialData } from "./actions/initialData";
import "mapbox-gl/dist/mapbox-gl.css";

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

  const API_KEY =
    "pk.eyJ1IjoidGhhaXJ5byIsImEiOiJjbDdjb2ZnY3QxM2F6M3FtaW9zMDFpNWkzIn0.tPFJvhG-HJ0TdmJGolVjHA";

  return (
    <Map
      {...viewport}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onMove={(e) => setViewport(e.viewport)}
      mapboxAccessToken={API_KEY}
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
      <NavigationControl position="bottom-right" />
      <FullscreenControl />
      <GeolocateControl />
    </Map>
  );
}
