<?php
declare(strict_types=1);

namespace App\Repositories;

use App\EnableX\Errors;
use App\Http\Requests\GetRoomRequest;
use App\Models\Room;
use App\Repositories\Contracts\GetRoomRepositoryInterface;
use App\Services\EnableX;

class GetRoomRepository implements GetRoomRepositoryInterface
{
    public function getRoom($attributes)
    {
        $roomId = $attributes->route('room');
        $room = Room::query()
            ->where('roomId', '=', $roomId)
            ->first();
        if (!$roomId) {
            $error = Errors::getError(4001);
            $error["desc"] = "Failed to get roomId from URL";
            return response()->json($error);
        }

        $enableX = new EnableX;
        return $enableX->createConnexion()
            ->get(config('enableX.url') ."rooms/", $roomId)
            ->json();
    }
}
