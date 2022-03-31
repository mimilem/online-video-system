<?php
declare(strict_types=1);

use App\Http\Controllers\Apps\RoomsAppController;
use App\Http\Controllers\RoomController;
use Illuminate\Support\Facades\Route;

Route::get('/', [RoomController::class, 'joinRoom'])->name('rooms.join');
Route::get('/create-rooms', [RoomController::class, 'createRoom'])->name('room.create');
Route::post('/create-rooms', [RoomController::class, 'storeRoom'])->name('room.store');


Route::get('/client/rooms/{room}/{type}/{ref}',  [RoomsAppController::class, 'index']);

