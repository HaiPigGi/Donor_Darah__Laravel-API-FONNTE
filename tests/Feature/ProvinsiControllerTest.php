<?php

namespace Tests\Feature;

use App\Models\Provinsi;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProvinsiControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_get_provinsi_data()
    {
        // Arrange
        $provinsi = Provinsi::factory()->create();

        // Act
        $response = $this->get('/get/provinsi');

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
