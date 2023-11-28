<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNewDBMEssage extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    // In your messages migration file
public function up()
{
    Schema::create('forum_message', function (Blueprint $table) {
        $table->id();
        $table->uuid('id_user');
        $table->foreignId('tagar_id')->constrained('tagars'); // Assuming 'tagars' is the correct table name
        $table->text('content');
        $table->timestamps();
        
        $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');
    });
}


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('forum_message');
    }
}
