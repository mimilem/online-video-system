<?php
declare(strict_types=1);

namespace App\Repositories;

use App\EnableX\Errors;
use App\Models\Room;
use App\Repositories\Contracts\CreateTokenRepositoryInterface;
use App\Services\EnableX;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;

final class CreateTokenRepository implements CreateTokenRepositoryInterface
{
    public EnableX $enableX;

    public function createToken($attributes)
    {
        $room = $this->getRoom($attributes);
        if ($room->roomPin == $attributes->input('roomPins')){
            $role = "moderator";
        } else if ($room->participantPin == $attributes->input('roomPins')){
            $role = "participant";
        }
        if (!$attributes->input('username') && !$attributes->input('meetingId') && !$attributes->input('roomPins')) {
            $error = Errors::getError(4004);
            $error["desc"] = "JSON keys missing: name, meetingId or roomPins";
            return response()->json($error);
        }
        return [
            $this->createdToken($attributes, $room, $role),
            $role,
            $room->roomName
        ];
    }


    private function getRoom($attributes): null|Builder|Model
    {
        return Room::query()
            ->where('roomId', '=', $attributes->input('meetingId'))
            ->where('status', '=', false)
            ->first();
    }

    private function createdToken($attributes, $room, $role): mixed
    {
        $room = [
            "name" => $attributes->input('username'),
            "room_id" => $room->roomId,
            "user_ref" => $attributes->input('roomPins'),
            "role" => $role,
        ];

        $enable = new EnableX;

        return $enable
            ->createConnexion()
            ->post(config('enableX.url') . "rooms/" . $room['room_id'] . "/tokens", $room)
            ->json();
    }
}
