<?php
declare(strict_types=1);

use App\Http\Controllers\Apps\RoomsAppController;
use App\Http\Controllers\RoomController;
use Illuminate\Support\Facades\Route;

Route::controller(RoomController::class)->group(function () {
    Route::get('/',  'joinRoom')->name('rooms.join');
    Route::get('/create-rooms', 'createRoom')->name('room.create');
    Route::post('/create-rooms', 'storeRoom')->name('room.store');
});

Route::get('/client/rooms/{room}/{type}/{ref}',  [RoomsAppController::class, 'index']);
