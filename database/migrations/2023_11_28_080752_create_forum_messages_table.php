<?php

namespace Database\Migrations;

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateForumMessagesTable extends Migration
{
    public function up()
    {
        Schema::create('forum_messages', function (Blueprint $table) {
            $table->id();
            $table->uuid('id_user');
            $table->foreignId('tagar_model_id')->constrained('tagars');
            $table->uuid('message_id')->unique();
            $table->text('content');
            $table->timestamps();

            $table->foreign('id_user')
            ->references('id')
            ->on('users')
            ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('forum_messages');
    }
}

