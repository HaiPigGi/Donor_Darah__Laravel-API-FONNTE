<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class sessionModel extends Model
{
    use HasFactory;

    protected $table = 'sessions'; // Specify the table name associated with this model

    protected $fillable = ['code','data'];
}
