<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Addtanggal extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profiles', function (Blueprint $table) {
            // Existing columns...
    
            // Change 'tanggal_lahir' to allow NULL values
            $table->timestamp('tanggal_lahir')->nullable()->change();
    
            // Additional columns...
        });
    }
    
    public function down()
    {
        Schema::table('profiles', function (Blueprint $table) {
            // Reverse the change if necessary
            $table->timestamp('tanggal_lahir')->nullable(false)->change();
        });
    }
}
