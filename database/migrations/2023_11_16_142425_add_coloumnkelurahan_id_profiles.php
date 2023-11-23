<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColoumnkelurahanIdProfiles extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('profiles', function (Blueprint $table) {
            // Add your new column definition here
            $table->uuid('kelurahan_id')->nullable()->after('golongan_darah');
            $table->foreign('kelurahan_id')->references('id')->on('kelurahan');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('profiles', function (Blueprint $table) {
            // Remove the column in the down method
            $table->dropColumn('kelurahan_id');
            // If you added a foreign key, you can drop it here
            // $table->dropForeign(['kelurahan_id']);
        });
    }
}
