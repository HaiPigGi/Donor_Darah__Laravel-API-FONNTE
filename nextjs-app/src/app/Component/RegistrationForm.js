"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function RegistrationForm() {
    const router = useRouter();
    const [provinsiData, setProvinsiData] = useState([]);
    const [kabupatenData, setKabupatenData] = useState([]);
    const [kecamatanData, setKecamatanData] = useState([]);
    const [kelurahanData, setKelurahanData] = useState([]);
    const [selectedProvinsi, setSelectedProvinsi] = useState("");
    const [selectedKabupaten, setSelectedKabupaten] = useState("");
    const [selectedKecamatan, setSelectedKecamatan] = useState("");
    const [selectedKelurahan, setSelectedKelurahan] = useState("");
    const [showModal, setShowModal] = useState(false); // State untuk mengontrol tampilan modal
    const [verificationCode, setVerificationCode] = useState(""); // State untuk kode verifikasi
    const [csrfToken, setCsrfToken] = useState(null); // State untuk menyimpan CSRF token
    const [formData, setFormData] = useState({
        nama: "",
        telepon: "",
        golongan_darah: "",
        provinsi_id: null,
        kabupaten_id: null,
        kecamatan_id: null,
        kelurahan_id: null,
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const csrfHandle = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/sanctum/csrf-cookie');
            const csrfToken = response.data.csrfToken;
            console.log("data csrf registrasi : ", csrfToken); // Log token CSRF untuk pemeriksaan
            return csrfToken; // Mengembalikan token CSRF
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
            throw error; // Lebih baik membiarkan panggilan fungsi menangani error ini
        }
     }



    const handleRegistration = async () => {
        try {
            const csrfToken = await csrfHandle(); // Menggunakan await untuk menunggu token CSRF
            // if (!csrfToken) {
            //     console.error("CSRF token not found.");
            //     alert("Registrasi gagal. Silakan coba lagi.");
            //     return;
            // }

            const parsedFormData = {
                ...formData,
                provinsi_id: parseInt(formData.provinsi_id),
                kabupaten_id: parseInt(formData.kabupaten_id),
                kecamatan_id: parseInt(formData.kecamatan_id),
                kelurahan_id: parseInt(formData.kelurahan_id),
            };

            // Simpan CSRF token di sessionStorage
            // sessionStorage.setItem("csrfToken", csrfToken);
            // console.log("data csrf Token : ",csrfToken);
            const response = await axios.post(
                "http://localhost:8000/api/register/auth",
                parsedFormData,
                {
                    headers: {
                        "X-CSRF-TOKEN": csrfToken, // Include CSRF token in the headers
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("data csrf registrasi : ", csrfToken);
            console.log(response.data);

            alert("Registrasi berhasil!");

            setShowModal(true);
        } catch (error) {
            console.error("Registration failed:", error);
            alert("Registrasi gagal. Silakan coba lagi.");
        }
    };

    const handleVerification = async () => {
        try {
            const csrfToken = await csrfHandle(); // Menggunakan await karena csrfHandle() adalah async function

            const response = await axios.post(
                "http://localhost:8000/api/register/auth/verify",
                {
                    code: verificationCode,
                },
                {

                }
            );
            // Handle the response data as needed
            alert("Verifikasi berhasil!");
            console.log(response.data);
            setShowModal(false);
            // Redirect atau tampilkan pesan berhasil, sesuai kebutuhan aplikasi Anda
        } catch (error) {
            console.error("Verification failed:", error);
            // Tampilkan pesan kesalahan atau beri tahu pengguna bahwa verifikasi gagal
        }
    };

    const fetchProvinsiData = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/api/get/provinsi"
            );
            setProvinsiData(response.data.provinsi);
        } catch (error) {
            console.error("Error fetching provinsi data:", error);
        }
    };

    const handleProvinsiChange = (e) => {
        const selectedProvinsiId = e.target.value;
        setSelectedProvinsi(selectedProvinsiId);
        setFormData((prevData) => ({
            ...prevData,
            provinsi_id: selectedProvinsiId,
            kabupaten_id: "", // Reset kabupaten_id when provinsi changes
            kecamatan_id: "", // Reset kecamatan_id when provinsi changes
            kelurahan_id: "", // Reset kelurahan_id when provinsi changes
        }));
        // Fetch kabupaten data based on selected provinsi ID
        axios
            .get(
                `http://localhost:8000/api/get/kabupaten/${selectedProvinsiId}`
            )
            .then((response) => {
                setKabupatenData(response.data.kabupaten);
            })
            .catch((error) => {
                console.error("Error fetching kabupaten data:", error);
            });
    };

    const handleKabupatenChange = (e) => {
        const selectedKabupatenId = e.target.value;
        setSelectedKabupaten(selectedKabupatenId);
        setFormData((prevData) => ({
            ...prevData,
            kabupaten_id: selectedKabupatenId,
            kecamatan_id: "", // Reset kecamatan_id when kabupaten changes
            kelurahan_id: "", // Reset kelurahan_id when kabupaten changes
        }));
        // Fetch kecamatan data based on selected kabupaten ID
        axios
            .get(
                `http://localhost:8000/api/get/kecamatan/${selectedKabupatenId}`
            )
            .then((response) => {
                setKecamatanData(response.data.kecamatan);
            })
            .catch((error) => {
                console.error("Error fetching kecamatan data:", error);
            });
    };

    const handleKecamatanChange = (e) => {
        const selectedKecamatanId = e.target.value;
        setSelectedKecamatan(selectedKecamatanId);
        setFormData((prevData) => ({
            ...prevData,
            kecamatan_id: selectedKecamatanId,
            kelurahan_id: "", // Reset kelurahan_id when kecamatan changes
        }));
        // Fetch kelurahan data based on selected kecamatan ID
        axios
            .get(
                `http://localhost:8000/api/get/kelurahan/${selectedKecamatanId}`
            )
            .then((response) => {
                setKelurahanData(response.data.kelurahan);
            })
            .catch((error) => {
                console.error("Error fetching kelurahan data:", error);
            });
    };

    // Fungsi untuk mengambil data kelurahan berdasarkan id kecamatan
    const fetchKelurahanData = (selectedKecamatanId) => {
        axios
            .get(
                `http://localhost:8000/api/get/kelurahan/${selectedKecamatanId}`
            )
            .then((response) => {
                setKelurahanData(response.data.kelurahan);
            })
            .catch((error) => {
                console.error("Error fetching kelurahan data:", error);
            });
    };

    // const fetchCsrfToken = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:8000/api/sanctum/csrf-cookie');
    //         const csrfToken = response.data.csrf_token; // Assuming the token is present in the response data
    //         console.log('CSRF Token:', csrfToken);
    //         return csrfToken;
    //     } catch (error) {
    //         console.error('Error fetching CSRF token:', error);
    //         return null;
    //     }
    // };

    // Panggil fungsi fetchCsrfToken() sesuai kebutuhan, mungkin di dalam useEffect atau event lainnya.
    useEffect(() => {
        // Memanggil fungsi fetchCsrfToken saat komponen dimuat
        //axios.defaults.withCredentials=true;
        //csrfHandle();
        fetchProvinsiData();
    }, []);

    return (
        <div>
            <input
                type="text"
                name="nama" // Ubah ini menjadi "nama"
                placeholder="Nama"
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="telepon"
                placeholder="Phone Number"
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="golongan_darah"
                placeholder="Blood Type"
                onChange={handleInputChange}
            />

            <select value={selectedProvinsi} onChange={handleProvinsiChange}>
                <option value="">Pilih Provinsi</option>
                {provinsiData.map((provinsi) => (
                    <option key={provinsi.id} value={provinsi.id}>
                        {provinsi.nama}
                    </option>
                ))}
            </select>
            <select value={selectedKabupaten} onChange={handleKabupatenChange}>
                <option value="">Pilih Kabupaten</option>
                {kabupatenData.map((kabupaten) => (
                    <option key={kabupaten.id} value={kabupaten.id}>
                        {kabupaten.nama}
                    </option>
                ))}
            </select>
            <select value={selectedKecamatan} onChange={handleKecamatanChange}>
                <option value="">Pilih Kecamatan</option>
                {kecamatanData.map((kecamatan) => (
                    <option key={kecamatan.id} value={kecamatan.id}>
                        {kecamatan.nama}
                    </option>
                ))}
            </select>
            <select
                value={selectedKelurahan}
                onChange={(e) => {
                    const selectedKelurahanId = e.target.value;
                    setSelectedKelurahan(selectedKelurahanId);
                    setFormData((prevData) => ({
                        ...prevData,
                        kelurahan_id: selectedKelurahanId,
                    }));
                }}
            >
                <option value="">Pilih Kelurahan</option>
                {kelurahanData.map((kelurahan) => (
                    <option key={kelurahan.id} value={kelurahan.id}>
                        {kelurahan.nama}
                    </option>
                ))}
            </select>

            <button onClick={handleRegistration}>Register</button>

            {/* Modal Bootstrap untuk kode verifikasi */}
            {showModal && (
                <div className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    Verification Code
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => setShowModal(false)}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <input
                                    type="text"
                                    value={verificationCode}
                                    onChange={(e) =>
                                        setVerificationCode(e.target.value)
                                    }
                                />
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleVerification}
                                >
                                    Verify
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default RegistrationForm;
