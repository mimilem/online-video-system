<?php
declare(strict_types=1);

namespace App\Repositories;

use App\EnableX\Errors;
use App\Models\Room;
use App\Repositories\Contracts\GetRoomRepositoryInterface;
use App\Services\EnableX;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

class GetRoomRepository implements GetRoomRepositoryInterface
{
    /**
     * @throws ContainerExceptionInterface
     * @throws NotFoundExceptionInterface
     */
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
            ->get(config('enableX.url') . "rooms/", $roomId)
            ->json();
    }
}
