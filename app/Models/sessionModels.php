<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class sessionModels extends Model
{
    use HasFactory;
    protected $table = 'sessions'; // Sesuaikan dengan nama tabel yang benar
    protected $fillable = ['code', 'session_id', 'data'];
}
