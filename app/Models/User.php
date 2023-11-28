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

    public function tagarUsers(): HasMany
    {
        return $this->hasMany(TagarUserMod::class, 'id_user', 'id');
    }

    public function messages(): HasMany
{
    return $this->hasMany(Message::class, 'id_user', 'id');
}


}
