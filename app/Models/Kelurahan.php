<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kelurahan extends Model
{
    use HasFactory;

    protected $table = 'kelurahan';
    public $timestamps = false;

    public function kecamatan()
    {
        return $this->belongsTo(Kecamatan::class);
    }
    
    protected $fillable = [
        'id',
        'kecamatan_id',
        'nama',
        // tambahkan kolom lain yang ingin di-mass assignable
    ];
}
