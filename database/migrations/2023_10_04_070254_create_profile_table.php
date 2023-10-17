<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProfileTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profile', function (Blueprint $table) {
            $table->id();
            $table->uuid('id_user');
            $table->string('nama');
            $table->string('Avatar')->nullable();
            $table->string('telepon')->unique()->nullable(false);
            $table->string('golongan_darah')->nullable(false);
            $table->uuid('alamat_id'); // Menggunakan unsignedBigInteger untuk mengacu ke kolom id di tabel provinsi
            $table->timestamps();

            $table->foreign('id_user')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->foreign('alamat_id')
                ->references('id')
                ->on('kelurahan')
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
        Schema::dropIfExists('profile');
    }
}
