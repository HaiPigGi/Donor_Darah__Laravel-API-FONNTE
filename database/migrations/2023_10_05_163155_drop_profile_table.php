<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DropProfileTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Perintah untuk menghapus tabel profile
        Schema::dropIfExists('profile');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Jika Anda ingin membuat tabel kembali saat melakukan rollback migrasi
        Schema::create('profile', function (Blueprint $table) {
            $table->id();
            $table->uuid('id_user');
            $table->string('nama');
            $table->string('Avatar')->nullable();
            $table->string('telepon')->unique()->nullable(false);
            $table->string('golongan_darah')->nullable(false);
            $table->unsignedBigInteger('provinsi_id')->nullable();
            $table->foreign('provinsi_id')->references('id')->on('provinsi');
            $table->unsignedBigInteger('kabupaten_id')->nullable();
            $table->foreign('kabupaten_id')->references('id')->on('kabupaten');
            $table->unsignedBigInteger('kecamatan_id')->nullable();
            $table->foreign('kecamatan_id')->references('id')->on('kecamatan');
            $table->unsignedBigInteger('kelurahan_id')->nullable();
            $table->foreign('kelurahan_id')->references('id')->on('kelurahan');
            $table->timestamps();
        });
    }
}
