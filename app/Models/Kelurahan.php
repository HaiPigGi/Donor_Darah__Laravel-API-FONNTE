<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kelurahan extends Model
{
    use HasFactory;

    protected $table = 'kelurahan';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'kecamatan_id',
        'nama',
    ];
    public function kecamatan()
    {
        return $this->belongsTo(Kecamatan::class);
    }
    public function profiles()
    {
        return $this->hasMany(profileModel::class, 'kelurahan_id'); 
    }
    public function akseptors()
    {
        return $this->hasMany(akseptor_model::class, 'kelurahan_id'); 
    }
    
}
