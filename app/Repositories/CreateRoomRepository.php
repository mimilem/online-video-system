<?php
declare(strict_types=1);

namespace App\Repositories;

use App\Repositories\Contracts\CreateRoomRepositoryInterface;
use App\Services\EnableX;
use App\Traits\RandomValue;

final class CreateRoomRepository implements CreateRoomRepositoryInterface
{
    use RandomValue;

    public function createRoom($attributes)
    {
        $random_name = rand(100000, 999999);
        $dateOld = $attributes->input('date');
        $time = $attributes->input('startTime');
        $currentTime = strtotime("".$dateOld." ".$time."");
        $hoursToAdd = -2;
        $secondsToAdd = $hoursToAdd * (60 * 60);
        $newTime = $currentTime + $secondsToAdd;
        $date =  date("Y-m-d H:i:s", $newTime);
        $time1 = $attributes->input('startTime');
        $time2 = $attributes->input('endTime');
        $array1 = explode(':', $time1);
        $array2 = explode(':', $time2);
        $minutes1 = ($array1[0] * 60.0 + $array1[1]);
        $minutes2 = ($array2[0] * 60.0 + $array2[1]);
        $diff = $minutes2 - $minutes1;
        $room = $this->renderMetadataForRoom(
            attributes: $attributes,
            random_name: $random_name,
            diff: $diff
        );

        $response = new EnableX;
        return $response->createConnexion()
            ->post(config('enableX.url') ."rooms/", $room)
            ->json();
    }

    private function renderMetadataForRoom($attributes, $random_name, $diff): array
    {
        return [
            "name" => "",
            "owner_ref" => $this->generateNumericValues(100000, 999999),
            "settings" => [
                "description" => "",
                "quality" => "SD",
                "mode" => "group",
                "participants" => "",
                "duration" => "" ,
                "scheduled" => false,
                "scheduled_time" => "",
                "auto_recording" => false,
                "active_talker" => true,
                "wait_moderator" => false,
                "adhoc" => false,
                "canvas" => true
            ],
            "sip" => [
                "enabled" => false
            ]
        ];
    }

}
