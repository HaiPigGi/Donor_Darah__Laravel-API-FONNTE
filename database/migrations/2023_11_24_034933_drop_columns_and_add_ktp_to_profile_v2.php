<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DropColumnsAndAddKtpToProfileV2 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Remove columns 'tanggal_lahir' and 'last_donor' from 'profiles' table
        Schema::table('profiles', function (Blueprint $table) {
            $table->dropColumn(['tanggal_lahir', 'last_donor']);
        });

        // Add new column 'ktp' to 'profiles' table after 'telepon'
        Schema::table('profiles', function (Blueprint $table) {
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
        // Reverse the changes made in the 'up' method
        Schema::table('profiles', function (Blueprint $table) {
            $table->date('tanggal_lahir')->nullable();
            $table->string('last_donor')->nullable();
            $table->dropColumn('ktp');
        });
    }
}
