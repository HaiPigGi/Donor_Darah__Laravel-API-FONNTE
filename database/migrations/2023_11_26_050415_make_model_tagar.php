<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MakeModelTagar extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tagars', function (Blueprint $table) {
            $table->id();
            $table->string('nama_tagar')->unique(); // Menjadikan nama_tagar sebagai unik
            $table->uuid('id_user');
            $table->unsignedInteger('jumlah_pengguna')->default(0); // Kolom jumlah pengguna
            $table->timestamps();
            
            $table->foreign('id_user')
            ->references('id')
            ->on('users')
            ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tagars');
    }
}
