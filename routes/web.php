<?php
declare(strict_types=1);

use App\Http\Apis\CreateTokenController;
use App\Http\Apis\GetRoomController;
use App\Http\Controllers\Apps\RoomsAppController;
use App\Http\Controllers\Apps\SettingController;
use App\Http\Controllers\RoomController;
use Illuminate\Support\Facades\Route;

Route::controller(RoomController::class)->group(function () {
    Route::get('/', 'joinRoom')->name('rooms.join');
    Route::get('/create-rooms', 'createRoom')->name('room.create');
    Route::post('/create-rooms', 'storeRoom')->name('room.store');
});

Route::post('create-token', [CreateTokenController::class, 'createToken'])->name('room.token');

Route::get('/client/rooms/{token}/{role}/{roomId}/{user_ref}/{room}', [RoomsAppController::class, 'index'])->name('room.connect');

Route::put('room/{roomId}', [SettingController::class, 'endRoom'])->name('room.end');
Route::post('/inviteRoom', [SettingController::class, 'inviteRoom']);
Route::post('/sendMail', [SettingController::class, 'sendEmail']);
Route::get('/getRoom/{room?}', [GetRoomController::class, 'index'])->name('room.getRoom');
