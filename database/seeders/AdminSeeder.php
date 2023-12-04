<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Admin;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        try {
            // Generate UUID for id_user column
            $id_user = Str::uuid();

            // Begin database transaction
            DB::beginTransaction();

            $user = User::create([
                'id' => $id_user,
                'nama' => 'Admin',
                'telepon' => '087793564543',
                'role' =>'admin',
            ]);

            // Commit the database transaction
            DB::commit();
        } catch (\Exception $e) {
            // Rollback the database transaction in case of an exception
            DB::rollback();
            throw $e; // Re-throw the exception for further handling, if needed
        }
    }
}
