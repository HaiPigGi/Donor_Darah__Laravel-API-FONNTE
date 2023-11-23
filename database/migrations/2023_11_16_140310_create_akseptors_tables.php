<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAkseptorsTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('akseptors', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('telepon')->unique()->nullable(false);
            $table->string('tanggal_lahir');
            $table->string('golongan_darah');
            $table->uuid('kelurahan_id')->nullable();
            $table->string('tujuan_Pengajuan');
            $table->string('image');
            $table->string('status')->default('belum verifikasi');
            $table->foreign('kelurahan_id')->references('id')->on('kelurahan');
           
            $table->timestamps();
           
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('akseptors_tables');
    }
}
