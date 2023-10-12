<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Kecamatan;

class GeoJsonSeederKecamatan extends Seeder
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

        if (isset($data['kecamatan'])) {
            foreach ($data['kecamatan'] as $kecamatanData) {
                $id_kecamatan = $kecamatanData['id'];
                $kabupaten_id = $kecamatanData['kabupaten_id'];
                $nama_kecamatan = $kecamatanData['nama'];

                Kecamatan::updateOrCreate(
                    ['id' => $id_kecamatan],
                    ['kabupaten_id' => $kabupaten_id, 'nama' => $nama_kecamatan]
                );
            }
        } else {
            echo "Data kecamatan tidak ditemukan dalam file JSON.";
        }
    }
}
