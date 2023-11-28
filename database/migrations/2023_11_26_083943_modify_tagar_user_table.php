<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyTagarUserTable extends Migration
{
    public function up()
    {
        Schema::table('tagar_user', function (Blueprint $table) {
            // Update the 'id_user' foreign key to use UUID
            $table->uuid('id_user')->change();
        });
    }

    public function down()
    {
        Schema::table('tagar_user', function (Blueprint $table) {
            // Revert the changes if needed
            $table->bigIncrements('id_user')->change();
        });
    }
}
