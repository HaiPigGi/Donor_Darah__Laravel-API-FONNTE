<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNewTagar extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->foreignId('tagar_id')->after('kelurahan_id')->nullable()->constrained('tagars');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
   public function down()
{
    Schema::dropIfExists('profiles');
}

}
