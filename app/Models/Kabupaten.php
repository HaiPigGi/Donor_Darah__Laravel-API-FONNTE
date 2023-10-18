<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kabupaten extends Model
{
    use HasFactory;

    protected $table = 'kabupaten';
    public $timestamps = false;
    public function kecamatan()
    {
        return $this->hasMany(Kecamatan::class);
    }
    protected $fillable = [
        'id',
        'provinsi_id',
        'nama',
        'lat',
        'long',
        // tambahkan kolom lain yang ingin di-mass assignable
    ];
}
