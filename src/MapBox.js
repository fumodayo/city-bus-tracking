import React, { useState } from "react";
import { Map } from "react-map-gl";

export default function MapBox() {
  const [viewport, setViewport] = useState({
    latitude: 10.86195853994233,
    longitude: 106.74362380706191,
    zoom: 8,
  });
  return (
    <Map
      {...viewport}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onMove={(viewport) => setViewport(viewport)}
      mapboxAccessToken="pk.eyJ1IjoidGhhaXJ5byIsImEiOiJjbDc4YWI5b3owN3U2M29zOXVvYnB3amw4In0.XEiN9BrQ_IMtm9c3TAcJYQ"
    />
  );
}
