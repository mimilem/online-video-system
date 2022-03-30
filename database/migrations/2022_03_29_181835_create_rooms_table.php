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
            $table->uuid();
            $table->foreignIdFor(User::class)
                ->constrained()
                ->cascadeOnDelete();
            $table->string('roomId')->unique();
            $table->string('roomName');
            $table->string('reference');
            $table->string('moderators');
            $table->dateTime('schedule');
            $table->string('duration');
            $table->string('participants');
            $table->string('mode', 64);
            $table->string('participantsID');
            $table->string('moderatorID');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('rooms');
    }
};
