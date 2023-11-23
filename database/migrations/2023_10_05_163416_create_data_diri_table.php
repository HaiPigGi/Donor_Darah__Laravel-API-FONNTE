<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDataDiriTable extends Migration
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
            $table->uuid('kelurahan_id')->nullable();
            $table->foreign('kelurahan_id')->references('id')->on('kelurahan');
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
        Schema::dropIfExists('data_diri');
    }
}
