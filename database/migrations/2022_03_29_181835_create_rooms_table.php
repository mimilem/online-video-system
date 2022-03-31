<?php
declare(strict_types=1);

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->string('roomId')->unique();
            $table->string('roomName');
            $table->string('roomPin')->unique();
            $table->string('reference');
            $table->dateTime('schedule');
            $table->string('duration');
            $table->string('participants');
            $table->boolean('status')->default(false);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('rooms');
    }
};
