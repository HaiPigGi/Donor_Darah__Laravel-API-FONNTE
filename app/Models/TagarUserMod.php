<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TagarUserMod extends Model
{
    use HasFactory;

    protected $table = 'tagar_user';

    protected $fillable = [
        'tagar_id',
        'id_user',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
