<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kecamatan extends Model
{
    use HasFactory;

    protected $table = 'kecamatan';
    public $timestamps = false;

    public function kabupaten()
    {
        return $this->belongsTo(Kabupaten::class);
    }

    protected $fillable = [
        'id',
        'kabupaten_id',
        'nama',
        // tambahkan kolom lain yang ingin di-mass assignable
    ];
}
