<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'id',
        'nama',
        'telepon',
        // tambahkan kolom lain yang ingin di-mass assignable
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    // User.php
    public function isAdmin()
    {
        return $this->role === 'admin';
    }
    public function profile()
    {
        return $this->hasOne(Profile::class);
    }



    // Definisikan relasi "one-to-one" dengan tabel data_diri
    public function dataDiri()
    {
        return $this->hasOne(DataDiri::class);
    }
}
