<?php
declare(strict_types=1);

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Models\Room;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;

class RoomsAppController extends Controller
{
    public function index($token, $role, $roomId, $user_ref, $room): Renderable
    {
        $rooms  = Room::query()
            ->where('roomId', '=', $roomId)
            ->first();

        return view('apps.pages.render', [
            'token' => $token,
            'role' => base64_decode($role),
            'roomId' => $roomId,
            'user_ref' => base64_decode($user_ref),
            'room' => base64_decode($room),
            $rooms
        ]);
    }
}
