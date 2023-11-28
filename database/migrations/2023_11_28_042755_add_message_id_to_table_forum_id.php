<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMessageIdToTableForumId extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Check if the column exists before attempting to add it
        if (!Schema::hasColumn('forum_messages', 'message_id')) {
            Schema::table('forum_messages', function (Blueprint $table) {
                $table->uuid('message_id')->index()->after('tagar_id');
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Check if the column exists before attempting to drop it
        if (Schema::hasColumn('forum_messages', 'message_id')) {
            Schema::table('forum_messages', function (Blueprint $table) {
                $table->dropColumn('message_id');
            });
        }
    }
}
