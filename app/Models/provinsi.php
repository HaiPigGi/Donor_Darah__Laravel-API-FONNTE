<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class provinsi extends Model
{
    use HasFactory;
    protected $table = 'provinsi';
    public $timestamps = false;

    public function kabupatens()
    {
        return $this->hasMany(Kabupaten::class);
    }
    public function profiles()
    {
        return $this->hasMany(Profile::class, 'provinsi_id');
    }

    protected $fillable = [
        'id',
        'name',
    ];

}
