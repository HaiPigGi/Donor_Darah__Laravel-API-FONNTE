"use client";
import React, { useEffect, useState } from 'react';
import Navbar from "@/_components/navbar";
import Loading from '@/_components/Loading/Loading';
import Card from '@/_components/card_tentang/card';
import "@/_styles/css/login.css";
import "@/_styles/css/regis.css";

const AboutPage = () => {
    
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate a delay (e.g., API request)
        const delay = setTimeout(() => {
            setLoading(false);
        }, 2000);

        // Update progress every 50ms until it reaches 100%
        const progressInterval = setInterval(() => {
            setProgress((prevProgress) =>
                prevProgress < 100 ? prevProgress + 1 : prevProgress,
            );
        }, 50);

        // Cleanup the timeout and interval to avoid memory leaks
        return () => {
            clearTimeout(delay);
            clearInterval(progressInterval);
        };
    }, []);

    return (
        <section className="h-screen overflow-hidden relative">
        <div className="my-bg h-full bg-cover bg-center">
            <div>
                {loading ? (
                    <Loading progress={progress} />
                ) : (
                    <div>
                        <Navbar itemsColor="text-white " />
                        <div className="row">
                        <div className="container mx-auto p-4 md:p-8" style={{ overflowY: 'auto', maxHeight: '80vh' }}>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 mt-5 text-red">Tentang Kami</h1>

                            <section className="bg-white p-4 md:p-6 lg:p-8 mb-4 md:mb-8 rounded-lg">
                                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">Cerita Tentang Donor Darah</h2>
                                <p className="text-gray-700">
                                    Donor darah adalah tindakan sukarela untuk memberikan darah yang dapat
                                    menyelamatkan nyawa. Setiap tetes darah yang Anda sumbangkan bisa
                                    membuat perbedaan besar dalam menyokong kebutuhan transfusi darah di
                                    masyarakat.
                                </p>
                                <p className="text-gray-700 mt-2">
                                    Di sini, kami berkomitmen untuk meningkatkan kesadaran masyarakat
                                    tentang pentingnya donor darah dan bagaimana setiap kontribusi kecil
                                    dapat memiliki dampak besar pada kehidupan orang lain.
                                </p>
                            </section>

                            <section className="bg-white p-4 md:p-6 lg:p-8 mb-4 md:mb-8 rounded-lg">
                                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">Fitur Kami</h2>
                                <ul className="list-disc pl-6 text-gray-700">
                                    <li>Notifikasi: Dapatkan pemberitahuan untuk mengingatkan jadwal donor Anda.</li>
                                    <li>Riwayat Donor: Pantau riwayat donor darah Anda untuk referensi masa depan.</li>
                                    <li>Peta Lokasi: Temukan pusat donor darah terdekat dengan mudah.</li>
                                    <li>Broadcast Golongan Darah: Kirim broadcast ke pengguna dengan golongan darah tertentu.</li>
                                    <li>Forum Live Chat: Berkomunikasi dengan pengguna lain melalui live chat menggunakan tagar.</li>
                                    <li>Login dengan Nomor Telepon: Mudahnya login dengan menggunakan nomor telepon.</li>
                                    <li>Titik Koordinat pada Maps: Tampilkan titik koordinat pada peta setelah pengguna login.</li>
                                    <li>Berita Terbaru: Lihat berita terbaru pada dashboard yang dapat diakses oleh pengguna.</li>
                                </ul>
                            </section>

                            <section className="bg-white p-4 md:p-6 lg:p-8 mb-4 md:mb-8 rounded-lg">
                                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">Mengapa Donor Darah Penting?</h2>
                                <p className="text-gray-700">
                                    Donor darah tidak hanya menyelamatkan nyawa tetapi juga memainkan peran
                                    kunci dalam penyediaan persediaan darah yang stabil untuk kebutuhan
                                    medis darurat, operasi, dan pengobatan pasien dengan kondisi medis
                                    tertentu.
                                </p>
                                <p className="text-gray-700 mt-2">
                                    Selain itu, donor darah teratur juga memiliki manfaat kesehatan bagi
                                    pendonor, seperti merangsang produksi sel darah baru dan meningkatkan
                                    kesehatan jantung.
                                </p>
                            </section>

                            <section className="bg-white p-4 md:p-6 lg:p-8 mb-4 md:mb-8 rounded-lg">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">Pekerja Donor Darah?</h2>
                                <Card/>
                            </section>
                        </div>
                    </div>
                    </div>
                )}
            </div>
        </div>
        </section>
    );
};

export default AboutPage;