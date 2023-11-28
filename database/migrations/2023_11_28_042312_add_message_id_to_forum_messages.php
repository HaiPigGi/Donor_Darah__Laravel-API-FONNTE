<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMessageIdToForumMessages extends Migration
{
    public function up()
    {
        Schema::table('forum_messages', function (Blueprint $table) {
            $table->integer('message_id')->after('tagar_id'); 
        });
    }

    public function down()
    {
        Schema::table('forum_messages', function (Blueprint $table) {
            $table->dropColumn('message_id');
        });
    }
}
