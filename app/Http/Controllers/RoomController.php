<?php
declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\CreateRoomRequest;
use Illuminate\Contracts\Support\Renderable;

class RoomController extends Controller
{
    public function createRoom(): Renderable
    {
        return view('apps.create');
    }

    public function joinRoom(): Renderable
    {
        return view('apps.index');
    }

    public function storeRoom(CreateRoomRequest $request)
    {

    }
}
