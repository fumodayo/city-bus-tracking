import React, { useState, useEffect } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import axios from "axios";

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

  const [addressMarker, setAddressMarker] = useState([]);

  const addressData = [
    { id: 1, address: "Bến xe Đà Nẵng" },
    { id: 2, address: "121 Tôn Đức Thắng, Đà Nẵng" },
    { id: 3, address: "721 Điện Biên Phủ, Đà Nẵng" },
  ];

  useEffect(() => {
    let newAddressData = [];
    addressData.map((adr) => {
      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${adr.address}.json?access_token=pk.eyJ1IjoidGhhaXJ5byIsImEiOiJjbDc4OTMzNzkwN2ZzM3ZueXE0NWdyNHB0In0.G_TZ_zbzQ8T7512A44nK9g`
        )
        .then((res) => {
          newAddressData.push({
            ...addressData,
            longitude: res.data.features[0].center[0],
            latitude: res.data.features[0].center[1],
          });
        })
        .catch((error) => console.log(error));
    });
    console.log(">>>newData", newAddressData);
    setAddressMarker(newAddressData);
  }, []);

  return (
    <Map
      {...viewport}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onMove={(e) => setViewport(e.viewport)}
      mapboxAccessToken="pk.eyJ1IjoidGhhaXJ5byIsImEiOiJjbDc4YWI5b3owN3U2M29zOXVvYnB3amw4In0.XEiN9BrQ_IMtm9c3TAcJYQ"
    >
      {addressMarker.map((addressm) => (
        <Marker
          key={addressm.id}
          latitude={addressm.latitude}
          longitude={addressm.longitude}
          anchor="bottom"
        >
          <img
            style={{ height: 50, width: 50, cursor: "pointer" }}
            onClick={handleTogglePopup}
            src="https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png"
            alt="marker"
          />
        </Marker>
      ))}
      {showPopup && (
        <Popup
          latitude={16.060034379945296}
          longitude={108.20939887509337}
          anchor="top-right"
          closeOnClick={false}
        >
          You are here
        </Popup>
      )}
    </Map>
  );
}
