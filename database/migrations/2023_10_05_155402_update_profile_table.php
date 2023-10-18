<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateProfileTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('profile', function (Blueprint $table) {
            $table->dropForeign(['alamat_id']); // Hapus foreign key yang ada

            $table->foreign('alamat_id')
                  ->references('id')
                  ->on('kabupaten')
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
        Schema::table('profile', function (Blueprint $table) {
            $table->dropForeign(['alamat_id']);
            $table->dropColumn('alamat_id');

            $table->uuid('alamat_id');
            $table->foreign('alamat_id')
                ->references('id')
                ->on('kelurahan')
                ->onDelete('cascade');
        });
    }
}
