"use client"
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import gambar from "@/assets/iconArrowDown.png";

function Map(){
    return(
        <MapContainer className="w-full h-full rounded-3xl" center={[-0.502183, 117.153801]} zoom={13} scrollWheelZoom={false} height={"50rem"}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[-0.502183, 117.153801]}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
            </Marker>
        </MapContainer>
    )
}

export default Map;