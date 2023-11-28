<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTagarModelIdToForumMessages extends Migration
{
    public function up()
    {
        Schema::table('forum_messages', function (Blueprint $table) {
            $table->unsignedBigInteger('tagar_model_id')->after('message_id');
        });
    }

    public function down()
    {
        Schema::table('forum_messages', function (Blueprint $table) {
            $table->dropColumn('tagar_model_id');
        });
    }
}
