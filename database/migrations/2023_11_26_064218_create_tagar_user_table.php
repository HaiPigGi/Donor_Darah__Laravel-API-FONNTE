<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTagarUserTable extends Migration
{
    public function up()
    {
        Schema::create('tagar_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tagar_id')->constrained();
            $table->uuid('id_user');

            $table->foreign('id_user')
            ->references('id')
            ->on('users')
            ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('tagar_user');
    }
}
