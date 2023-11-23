<?php

namespace Tests\Feature;

use App\Models\provinsiModel;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class ProvinsiControllerTest extends TestCase
{
    use DatabaseTransactions;

    /** @test */
    public function it_can_get_provinsi_data()
    {
        // Arrange
        $provinsi = provinsiModel::factory()->create();

        // Act
        $response = $this->get('api/get/provinsi');

        // Assert
        $response->assertStatus(200);
        $response->assertJson([
            'provinsi' => [
                [
                    'id' => $provinsi->id,
                    'nama' => $provinsi->nama,
                    // tambahkan properti lain sesuai kebutuhan
                ]
            ]
        ]);
    }
}
