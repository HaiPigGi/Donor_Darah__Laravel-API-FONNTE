<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DropSessionIdColumnFromSessionsTable extends Migration
{
    public function up()
    {
        // Drop the 'session_id' column from the 'sessions' table
        Schema::table('sessions', function (Blueprint $table) {
            $table->dropColumn('session_id');
        });
    }

    public function down()
    {
        // Add back the 'session_id' column to the 'sessions' table if needed
        Schema::table('sessions', function (Blueprint $table) {
            $table->string('session_id')->unique();
        });
    }
}
