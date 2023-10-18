<?php

namespace Database\Seeders;
use App\Models\Kelurahan;
use Illuminate\Database\Seeder;

class GeoJsonSeederKelurahan extends Seeder
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

        if (isset($data['kelurahan'])) {
            foreach ($data['kelurahan'] as $kelurahanData) {
                $id_kelurahan = $kelurahanData['id'];
                $kecamatan_id = $kelurahanData['kecamatan_id']; // Fixed typo in the key
                $nama_kelurahan = $kelurahanData['nama'];

                Kelurahan::updateOrCreate(
                    ['id' => $id_kelurahan],
                    ['kecamatan_id' => $kecamatan_id, 'nama' => $nama_kelurahan]
                );
            }
        } else {
            echo "Data kelurahan tidak ditemukan dalam file JSON.";
        }
    }
}
