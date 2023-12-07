<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColoumnAndDropColoumnToAkseptor extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('akseptors', function (Blueprint $table) {
            $table->dropColumn('tanggal_lahir');
            $table->dropColumn('image');
            $table->string('jumlah_kantong')->after('golongan_darah');
            $table->string('alamat')->nullable();
            $table->string('ktp')->after('telepon');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('akseptors', function (Blueprint $table) {
            // Add the dropped columns back
            $table->date('tanggal_lahir');
            $table->string('image');
    
            // Remove the added columns
            $table->dropColumn('jumlah_kantong');
            $table->dropColumn('alamat');
            $table->dropColumn('ktp');
        });
    }
    
}
