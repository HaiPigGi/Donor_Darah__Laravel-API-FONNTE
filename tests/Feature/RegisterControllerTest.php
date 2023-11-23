<?php
namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Http\Controllers\Auth\RegisterController;
use Tests\TestCase;

class RegisterControllerTest extends TestCase
{
    use DatabaseTransactions; // Using DatabaseTransactions to run tests

    /** @test */
    public function it_can_send_verification_code_and_redirect_to_verify_page()
    {
        // Simulate data to be sent in the request
        $data = [
            'name' => 'John Doe',
            'telepon' => '1234567890',
            'golongan_darah' => 'A',
        ];

        // Request POST to the 'verify' method on the controller
        $response = $this->post(route('register.verify'), $data);

        // Check that the response is a redirect
        $response->assertRedirect(route('verify'));

        // Check that the success message is in the session
        $this->assertTrue(session()->has('success'));
    }

    /** @test */
    public function it_can_create_a_user()
    {
        // Create controller instance
        $controller = new RegisterController();

        // User data to be created
        $userData = [
            'name' => 'John Doe',
            'telepon' => '1234567890',
            'golongan_darah' => 'A',
        ];

        // Save user data into session
        session(['validated_data' => $userData]);

        // Simulate a random password
        $randomPassword = Str::random(8);
        session(['random_password' => $randomPassword]);

        // Call the createUser method using "call"
        $user = $this->callPrivateMethod($controller, 'createUser', [$userData]);

        // Verify that the user has been created in the database
        $this->assertDatabaseHas('users', [
            'name' => $userData['name'],
            'telepon' => $userData['telepon'],
            'golongan_darah' => $userData['golongan_darah'],
        ]);

        // Verify that the password has been hashed correctly
        $this->assertTrue(Hash::check($randomPassword, $user->password));
    }

    // Function to call private method
    private function callPrivateMethod($object, $method, $parameters = [])
    {
        $reflection = new \ReflectionClass($object);
        $method = $reflection->getMethod($method);
        $method->setAccessible(true);

        return $method->invokeArgs($object, $parameters);
    }
}
