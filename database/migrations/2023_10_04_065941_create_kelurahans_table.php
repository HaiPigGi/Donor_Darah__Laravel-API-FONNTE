<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKelurahansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kelurahan', function (Blueprint $table) {
            $table->uuid('id')->primary(); // Menggunakan UUID sebagai primary key
            $table->uuid('kecamatan_id');
            $table->string('nama');



        // Menambahkan foreign key constraint
        $table->foreign('kecamatan_id')
        ->references('id')
        ->on('kecamatan')
        ->onDelete('cascade'); // Jika data di tabel provinsi dihapus, data yang terkait di tabel kabupaten juga akan dihapus
    });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('kelurahan');
    }
}
