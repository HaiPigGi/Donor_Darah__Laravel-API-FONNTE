<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class akseptor_model extends Model
{
    use HasFactory;

    protected $table = 'akseptors'; // Assuming your table name is 'akseptors'

    protected $fillable = [
        'nama',
        'telepon',
        'tanggal_lahir',
        'golongan_darah',
        'tujuan_Pengajuan',
        'image',
    ];

    public function kelurahan()
    {
        return $this->belongsTo(Kelurahan::class);
    }
}
