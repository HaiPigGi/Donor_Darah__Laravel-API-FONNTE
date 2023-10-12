<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class data_diri extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'Avatar',
        'golongan_darah',
        'alamat',
        // tambahkan kolom lain yang ingin di-mass assignable
    ];

    // Definisikan relasi "one-to-one" dengan tabel users
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
