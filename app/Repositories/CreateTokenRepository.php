<?php
declare(strict_types=1);

namespace App\Repositories;

use App\EnableX\Errors;
use App\Repositories\Contracts\CreateTokenRepositoryInterface;
use App\Services\EnableX;

final class CreateTokenRepository implements CreateTokenRepositoryInterface
{
    public function createToken($attributes)
    {
        if (!$attributes->input('username') && !$attributes->input('meetingId') && !$attributes->input('roomPins')) {
            $error = Errors::getError(4004);
            $error["desc"] = "JSON keys missing: name, role or roomId";
            return response()->json($error);
        }
        $room = [
            "name"      => $attributes->input('username'),
            "room_id"   => $attributes->input('meetingId'),
            "user_ref"  => $attributes->input('roomPins'),
            "role"	    => "",
        ];

        $response = new EnableX;
        return $response->createConnexion()
            ->post(config('enableX.url') ."rooms/".$room['room_id']."/tokens", $room)
            ->json();
    }
}
