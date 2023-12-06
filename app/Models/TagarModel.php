<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TagarModel extends Model
{
    use HasFactory;

    protected $table = 'tagars';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'nama_tagar',
        'jumlah_pengguna',
    ];

    // public function users(): BelongsToMany
    // {
    //     return $this->belongsToMany(User::class, 'profiles', 'tagar_id');
    // }
     public function messages()
        {
         return $this->hasMany(Message::class);
      }
      public function profiles()
    {
        return $this->hasMany(profileModel::class, 'tagar_id'); // Update the model name and foreign key
    }



}
