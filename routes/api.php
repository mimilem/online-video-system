<?php

use App\Http\Apis\CreateTokenController;
use Illuminate\Support\Facades\Route;

Route::post('create-token', [CreateTokenController::class, 'createToken']);
