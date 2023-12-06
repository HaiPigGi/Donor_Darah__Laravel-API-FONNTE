<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\TagarUserMod;
use App\Models\Message;
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'users';


    protected $primaryKey = 'id';

    protected $keyType = 'string';

    public $incrementing = false;
    protected $fillable = [
        'id',
        'nama',
        'telepon',
    ];


    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    // User.php
    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    // public function tagarUsers(): HasMany

    // {
    //     return $this->hasMany(TagarUserMod::class, 'id_user', 'id');
    // }

    public function messages(): HasMany
{
    return $this->hasMany(Message::class, 'id_user', 'id');
}
// Inside User.php model
public function profile()
{
    return $this->belongsTo(profileModel::class, 'tagar_id', 'id');
}


}
