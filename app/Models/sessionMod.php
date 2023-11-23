<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class sessionMod extends Model
{
    use HasFactory;
    protected $table = 'sessions'; // Specify the table name associated with this model

    protected $fillable = ['code','data'];
}
