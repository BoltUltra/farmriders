"use client";

import { useState, useEffect } from "react";
import Map, { Marker } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import Image from "next/image";
import { truck } from "../public/images/webp";

const MAPBOX_TOKEN = "pk.eyJ1IjoibGludGFuZzIiLCJhIjoiY2pzNDJkaGJuMDBscDRhbGczMm1nOGM3aSJ9.9mrUUK4Z_YX9bZDMm1YZFA";

const DriverMap = ({ driverLocation }) => {
  const [viewState, setViewState] = useState({
    longitude: 8.58041, // fallback default value
    latitude: 12.00920, // fallback default value
    zoom: 12,
  });

  useEffect(() => {
    const handleResize = () => {
      window.dispatchEvent(new Event('resize'));
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Check if the driverLocation is valid
    if (driverLocation && !isNaN(driverLocation.longitude) && !isNaN(driverLocation.latitude)) {
      setViewState({
        longitude: driverLocation.longitude,
        latitude: driverLocation.latitude,
        zoom: 12,
      });
    }
  }, [driverLocation]);

  if (!driverLocation || isNaN(driverLocation.longitude) || isNaN(driverLocation.latitude)) {
    return <div>Loading driver location...</div>; // Add a fallback UI if the location is invalid
  }

  return (
    <Map
      {...viewState}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={MAPBOX_TOKEN}
      onMove={(evt) => setViewState(evt.viewState)}
    >
      <Marker
        longitude={driverLocation.longitude}
        latitude={driverLocation.latitude}
      >
        <Image src={truck} alt="Driver's vehicle" width={40} height={40} />
      </Marker>
    </Map>
  );
};

export default DriverMap;
