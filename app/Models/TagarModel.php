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

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'tagar_user', 'tagar_id', 'id_user');
    }
        public function messages()
            {
                return $this->hasMany(Message::class);
            }
}
