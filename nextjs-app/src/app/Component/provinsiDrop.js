import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RegistrationForm() {
    const [provinsiData, setProvinsiData] = useState([]);
    const [kabupatenData, setKabupatenData] = useState([]);
    const [selectedProvinsi, setSelectedProvinsi] = useState('');
    const [selectedKabupaten, setSelectedKabupaten] = useState('');

    useEffect(() => {
        // Fetch provinsi data
        axios.get('http://localhost:8000/api/get/provinsi')
            .then(response => {
                setProvinsiData(response.data.provinsi);
            })
            .catch(error => {
                console.error('Error fetching provinsi data:', error);
            });
    }, []);

    const handleProvinsiChange = (e) => {
        const selectedProvinsiId = e.target.value;
        setSelectedProvinsi(selectedProvinsiId);
        // Fetch kabupaten data based on selected provinsi ID
        axios.get(`http://localhost:8000/api/get/kabupaten/${selectedProvinsiId}`)
            .then(response => {
                setKabupatenData(response.data.kabupaten);
            })
            .catch(error => {
                console.error('Error fetching kabupaten data:', error);
            });
    };

    return (
        <div>
            <select value={selectedProvinsi} onChange={handleProvinsiChange}>
                <option value="">Pilih Provinsi</option>
                {provinsiData.map(provinsi => (
                    <option key={provinsi.id} value={provinsi.id}>
                        {provinsi.nama}
                    </option>
                ))}
            </select>
            <select value={selectedKabupaten} onChange={(e) => setSelectedKabupaten(e.target.value)}>
                <option value="">Pilih Kabupaten</option>
                {kabupatenData.map(kabupaten => (
                    <option key={kabupaten.id} value={kabupaten.id}>
                        {kabupaten.nama}
                    </option>
                ))}
            </select>
            {/* Other form inputs */}
        </div>
    );
}

export default RegistrationForm;
