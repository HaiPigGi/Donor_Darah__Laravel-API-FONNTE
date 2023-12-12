<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class profileModel extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'profiles';

    protected $fillable = [
        'id_user',
        'nama',
        'telepon',
        'golongan_darah',
        'ktp',
        'pekerjaan',
        'kelurahan_id',
        'tagar_id', 
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function provinsi()
    {
        return $this->belongsTo(provinsiModel::class, 'provinsi_id');
    }

    public function kabupaten()
    {
        return $this->belongsTo(Kabupaten::class, 'kabupaten_id');
    }

    public function kecamatan()
    {
        return $this->belongsTo(Kecamatan::class, 'kecamatan_id');
    }

    public function kelurahan()
    {
        return $this->belongsTo(Kelurahan::class, 'kelurahan_id');
    }

    public function tagar()
    {
        return $this->belongsTo(TagarModel::class, 'tagar_id');
    }
}
