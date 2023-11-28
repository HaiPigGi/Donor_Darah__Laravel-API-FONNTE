<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Message extends Model
{
    use HasFactory;

    protected $table = "forum_messages";

    protected $fillable = [
        'id_user',
        'tagar_model_id',
        'message_id',
        'content',
        
    ];


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_user', 'id');
    }

    public function tagar()
    {
        return $this->belongsTo(TagarModel::class, 'tagar_model_id');
    }
}
