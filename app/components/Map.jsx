"use client";

import { useState, useEffect } from "react";
import Map, { Marker } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import Image from "next/image";
import { dashboardVehicle, truck } from "../public/images/webp";

const MAPBOX_TOKEN = "pk.eyJ1IjoibGludGFuZzIiLCJhIjoiY2pzNDJkaGJuMDBscDRhbGczMm1nOGM3aSJ9.9mrUUK4Z_YX9bZDMm1YZFA";
// const MAPBOX_TOKEN = "pk.eyJ1Ijoic29mdG1hZ2ljIiwiYSI6ImNrMGJraGRnbjB2YXUzbnE4bm9ibTFzYm4ifQ.RZfNvqLNr4UbHmcpbzbd_Q";

const cars = [
  { id: 1, latitude: 12.0723, longitude: 8.5236, name: 'Car 1' },
  { id: 2, latitude: 12.0021, longitude: 8.5344, name: 'Car 2' },
  { id: 3, latitude: 11.9471, longitude: 8.6065, name: 'Car 3' },
  { id: 4, latitude: 12.0500, longitude: 8.4651, name: 'Car 4' },
  { id: 5, latitude: 12.0750, longitude: 8.5315, name: 'Car 5' },
  { id: 6, latitude: 12.0013, longitude: 8.4906, name: 'Car 6' },
  { id: 7, latitude: 12.1162, longitude: 8.5168, name: 'Car 7' },
  { id: 8, latitude: 11.9056, longitude: 8.5212, name: 'Car 8' },
  { id: 9, latitude: 12.0611, longitude: 8.4811, name: 'Car 9' },
  { id: 10, latitude: 12.0273, longitude: 8.6432, name: 'Car 10' },
  { id: 11, latitude: 12.0348, longitude: 8.5009, name: 'Car 11' },
  { id: 12, latitude: 12.0981, longitude: 8.5552, name: 'Car 12' },
  { id: 13, latitude: 12.0143, longitude: 8.5732, name: 'Car 13' },
  { id: 14, latitude: 12.1426, longitude: 8.5205, name: 'Car 14' },
  { id: 15, latitude: 11.9810, longitude: 8.6201, name: 'Car 15' },
  { id: 16, latitude: 11.9315, longitude: 8.4703, name: 'Car 16' },
  { id: 17, latitude: 12.0555, longitude: 8.6055, name: 'Car 17' },
  { id: 18, latitude: 12.1014, longitude: 8.4635, name: 'Car 18' },
  { id: 19, latitude: 11.9654, longitude: 8.5157, name: 'Car 19' },
  { id: 20, latitude: 12.0902, longitude: 8.6034, name: 'Car 20' },
];

const MapWithCars = () => {
  const [viewState, setViewState] = useState({
    longitude: 8.58041,
    latitude: 12.00920,
    zoom: 12,
  });

  useEffect(() => {
    const handleResize = () => {
      window.dispatchEvent(new Event('resize'));
    };

    // Trigger resize event when component mounts
    handleResize();

    // Trigger resize event on window resize
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Map
      {...viewState}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={MAPBOX_TOKEN}
      onMove={(evt) => setViewState(evt.viewState)}
    >
      {cars.map((car) => (
        <Marker
          key={car.id}
          longitude={car.longitude}
          latitude={car.latitude}
        >
          <Image src={truck} alt='car image' />
          {/* <img src="/car-icon.png" alt={car.name} width={40} height={40} /> */}
        </Marker>
      ))}
    </Map>
  );
};

export default MapWithCars;
