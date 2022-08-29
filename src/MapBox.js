import React, { useState } from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
  Source,
  Layer,
} from "react-map-gl";
import { initialData } from "./actions/initialData";
import "mapbox-gl/dist/mapbox-gl.css";
import { lineArt } from "./lineArt";

export default function MapBox() {
  const [viewport, setViewport] = useState({
    latitude: 16.082620606761385,
    longitude: 108.22371699783464,
    zoom: 16,
  });

  const [showPopup, setShowPopup] = useState(true);
  const handleTogglePopup = () => {
    setShowPopup(!showPopup);
  };

  const API_KEY =
    "pk.eyJ1IjoidGhhaXJ5byIsImEiOiJjbDdjb2ZnY3QxM2F6M3FtaW9zMDFpNWkzIn0.tPFJvhG-HJ0TdmJGolVjHA";

  // const checkDistance = () => {
  //   axios
  //     .get(
  //       `https://api.mapbox.com/directions/v5/mapbox/cycling/108.22371699783464,16.082620606761385;108.22133029968681,16.082657169371853?geometries=geojson&access_token=${API_KEY}`
  //     )
  //     .then((res) => {
  //       const distance = res.data.routes[0].geometry.coordinates;
  //       console.log(distance);
  //       setDataCood(distance);
  //     })
  //     .catch((error) => console.log(error));
  // };

  // useEffect(() => {
  //   checkDistance();
  // }, []);

  const dataLine = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: lineArt,
    },
  };

  console.log(initialData)

  return (
    <Map
      {...viewport}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onMove={(e) => setViewport(e.viewport)}
      mapboxAccessToken={API_KEY}
    >
      <Source id="polylineLayer" type="geojson" data={dataLine}>
        <Layer
          id="lineLayer"
          type="line"
          source="my-data"
          layout={{
            "line-join": "round",
            "line-cap": "round",
          }}
          paint={{
            "line-color": "rgb(255, 0, 0)",
            "line-width": 5,
          }}
        />
      </Source>
      {initialData.busRoutes.map((addressm) =>
        addressm.route.map((i) => (
          <Marker
            key={i.id}
            latitude={i.location.lat}
            longitude={i.location.lng}
            anchor="bottom"
          >
            <img
              style={{ height: 50, width: 50, cursor: "pointer" }}
              src="https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png"
              alt="marker"
              onClick={handleTogglePopup}
            />
            {showPopup && (
              <Popup
                key={i.id}
                latitude={i.location.lat}
                longitude={i.location.lng}
                anchor="top-right"
                closeOnClick={false}
              >
                {i.name}
              </Popup>
            )}
          </Marker>
        ))
      )}
      <NavigationControl position="bottom-right" />
      <FullscreenControl />
      <GeolocateControl />
    </Map>
  );
}
