<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\provinsiModel;
use App\Models\Kabupaten;
use App\Models\Kecamatan;
use App\Models\Kelurahan;

class GeoJsonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        $jsonUrl = url('json/Maps.json');
        $jsonData = file_get_contents($jsonUrl);
        $data = json_decode($jsonData, true);

        if (isset($data['provinsi']) && isset($data['kabupaten'])) {
            // Seed Provinsi
            foreach ($data['provinsi'] as $provinsiData) {
                //dd($data['provinsi']);
                provinsiModel::updateOrCreate(
                    ['id' => $provinsiData['id']],
                    ['nama' => $provinsiData['nama']]
                );
            }
            // Seed Kabupaten, Kecamatan, Kelurahan
            foreach ($data['kabupaten'] as $kabupatenData) {
                // Extract kabupaten data
                $id = $kabupatenData['id'];
                $provinsi_id = $kabupatenData['provinsi_id'];
                $nama = $kabupatenData['nama'];
                $lat = $kabupatenData['lat'];
                $long = $kabupatenData['long'];

                // Create or update kabupaten
                $kabupaten = Kabupaten::updateOrCreate(
                    ['id' => $id],
                    ['provinsi_id' => $provinsi_id, 'nama' => $nama, 'lat' => $lat, 'long' => $long]
                );

                // Create or update kecamatan and kelurahan data if available
                if (isset($kabupatenData['kecamatan'])) {
                    foreach ($kabupatenData['kecamatan'] as $kecamatanData) {
                        // Extract kecamatan data
                        $id_kecamatan = $kecamatanData['id'];
                        $nama_kecamatan = $kecamatanData['nama'];

                        // Create or update kecamatan
                        $kecamatan = Kecamatan::updateOrCreate(
                            ['id' => $id_kecamatan],
                            ['kabupaten_id' => $kabupaten->id, 'nama' => $nama_kecamatan]
                        );

                        // Create or update kelurahan data if available
                        if (isset($kecamatanData['kelurahan'])) {
                            foreach ($kecamatanData['kelurahan'] as $kelurahanData) {
                                // Extract kelurahan data
                                $id_kelurahan = $kelurahanData['id'];
                                $nama_kelurahan = $kelurahanData['nama'];

                                // Create or update kelurahan
                                Kelurahan::updateOrCreate(
                                    ['id' => $id_kelurahan],
                                    ['kecamatan_id' => $kecamatan->id, 'nama' => $nama_kelurahan]
                                );
                            }
                        }
                    }
                }
            }
        } else {
            echo "Struktur data tidak sesuai. Pastikan kunci 'provinsi' dan 'kabupaten' ada dalam file JSON.";
        }
    }
}
