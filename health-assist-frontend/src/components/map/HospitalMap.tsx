import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Typography, Paper } from '@mui/material';
import L from 'leaflet';

// Fix for default marker icon in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface HospitalMapProps {
    specialist: string;
}

const HospitalMap: React.FC<HospitalMapProps> = ({ specialist }) => {
    const [position, setPosition] = useState<[number, number] | null>(null);
    const [hospitals, setHospitals] = useState<{ id: number, name: string, lat: number, lng: number }[]>([]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setPosition([latitude, longitude]);

                    // Mock nearby hospitals based on current location
                    setHospitals([
                        { id: 1, name: `City ${specialist} Center`, lat: latitude + 0.002, lng: longitude + 0.002 },
                        { id: 2, name: `General Hospital (${specialist} Dept)`, lat: latitude - 0.003, lng: longitude - 0.001 },
                        { id: 3, name: `Advanced ${specialist} Clinic`, lat: latitude + 0.001, lng: longitude - 0.004 },
                    ]);
                },
                (err) => {
                    console.error(err);
                    // Default to New York if location denied
                    setPosition([40.7128, -74.0060]);
                }
            );
        }
    }, [specialist]);

    if (!position) return <Typography>Loading Map...</Typography>;

    return (
        <Paper elevation={3} sx={{ height: 400, width: '100%', overflow: 'hidden', borderRadius: 2, mt: 3 }}>
            <Box sx={{ p: 2, bgcolor: 'primary.light', color: 'white' }}>
                <Typography variant="h6">Nearby {specialist}s</Typography>
            </Box>
            <MapContainer center={position} zoom={14} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>You are here</Popup>
                </Marker>
                {hospitals.map((hospital) => (
                    <Marker key={hospital.id} position={[hospital.lat, hospital.lng]}>
                        <Popup>{hospital.name}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </Paper>
    );
};

export default HospitalMap;
