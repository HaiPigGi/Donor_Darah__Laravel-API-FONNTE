<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class AddUuidToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Check if the 'id' column doesn't already exist
            if (!Schema::hasColumn('users', 'id')) {
                // Add the id column as a UUID with a default value
                $table->uuid('id')->default(DB::raw('UUID()'))->first();

                // Make sure 'id' column is the primary key
                $table->primary('id');
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            // Drop the 'id' column if it exists
            $table->dropColumn('id');
        });
    }
}
