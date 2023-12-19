"use client";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import axios from "axios";

function Map() {
  const [userLocations, setUserLocations] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_APP_URL_API;

  useEffect(() => {
    const fetchUserLocations = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/user/map`);
        setUserLocations(response.data.user_locations);
      } catch (error) {
        console.error("Error fetching user locations:", error);
      }
    };

    fetchUserLocations();
  }, []);

  // Extracting latitudes and longitudes from userLocations
  const coordinates = userLocations.map(({ lat, long }) => [parseFloat(lat), parseFloat(long)]);

  // Calculate the bounds of all coordinates
  const bounds = coordinates.length > 0 ? L.latLngBounds(coordinates) : null;

  // Determine the marker size based on screen width
  const markerSize = window.innerWidth <= 600 ? [20, 20] : [30, 30];

  // Use the default marker icon from Leaflet
  const defaultIcon = new L.Icon.Default();

  return (
    <MapContainer className="w-full h-full rounded-3xl" center={[-0.8688889, 109.9072559]} zoom={4} scrollWheelZoom={false} height={"50rem"} bounds={bounds}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Map through userLocations and create Marker for each user */}
      {userLocations.map((userLocation) => (
        <Marker
          key={userLocation.user_id}
          position={[parseFloat(userLocation.lat), parseFloat(userLocation.long)]}
          icon={defaultIcon}
          iconSize={markerSize}
        >
          <Popup>
            Lat: {userLocation.lat}
            <br />
            Long: {userLocation.long}
          </Popup>
        </Marker>
      ))}

      {/* Draw polyline connecting all waypoints */}
      <Polyline positions={coordinates} color="red" />
    </MapContainer>
  );
}

export default Map;
