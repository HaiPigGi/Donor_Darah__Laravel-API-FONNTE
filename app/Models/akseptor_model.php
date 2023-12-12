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
        'ktp',
        'golongan_darah',
        'jumlah_kantong',
        'kelurahan_id',
        'tujuan_Pengajuan',
        'alamat',
    ];

    public function kelurahan()
    {
        return $this->belongsTo(Kelurahan::class, 'kelurahan_id');
    }
}
