<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Http\Controllers\Auth\RegisterController;
class RegisterControllerTest extends TestCase
{
    use RefreshDatabase; // Untuk mengatur ulang database setelah setiap pengujian

    /** @test */
    public function it_can_send_verification_code_and_redirect_to_verify_page()
    {
        // Simulasikan data yang akan dikirim dalam permintaan
        $data = [
            'name' => 'John Doe',
            'telepon' => '1234567890',
            'golongan_darah' => 'A',
        ];

        // permintaan POST ke metode 'verify' pada controller
        $response = $this->post(route('register.verify'), $data);

        // Periksa bahwa respons adalah redirect
        $response->assertRedirect(route('verify'));

        // Periksa bahwa pesan sukses ada dalam sesi
        $this->assertTrue(session()->has('success'));
    }
 /** @test */
public function it_can_create_a_user()
{
    // Buat instance controller
    $controller = new RegisterController();

    // Data pengguna yang akan dibuat
    $userData = [
        'name' => 'John Doe',
        'telepon' => '1234567890',
        'golongan_darah' => 'A',
    ];

    // Simpan data pengguna ke dalam sesi
    session(['validated_data' => $userData]);

    // Simulasi random password
    $randomPassword = Str::random(8);
    session(['random_password' => $randomPassword]);

    // Panggil metode createUser menggunakan "call"
    $user = $this->callPrivateMethod($controller, 'createUser', [$userData]);

    // Verifikasi bahwa pengguna telah dibuat dalam database
    $this->assertDatabaseHas('users', [
        'name' => $userData['name'],
        'telepon' => $userData['telepon'],
        'golongan_darah' => $userData['golongan_darah'],
    ]);

    // Verifikasi bahwa password telah di-hash dengan benar
    $this->assertTrue(Hash::check($randomPassword, $user->password));
}

// Fungsi untuk memanggil metode private
private function callPrivateMethod($object, $method, $parameters = [])
{
    $reflection = new \ReflectionClass($object);
    $method = $reflection->getMethod($method);
    $method->setAccessible(true);

    return $method->invokeArgs($object, $parameters);
}

}

