<?php
declare(strict_types=1);

namespace App\Repositories;

use App\Enums\RoomStatusEnum;
use App\Mail\SendRoomIdMail;
use App\Models\Room;
use App\Repositories\Contracts\SettingRepositoryInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail;

class SettingRepository implements SettingRepositoryInterface
{
    public function endRoom($attributes): Model|Builder|null
    {
        $room = $this->getRoom($attributes);
        $room->update([
            'status' => RoomStatusEnum::TRUE
        ]);
        return $room;
    }

    public function inviteRoom($attributes): Model|Builder|null
    {
        $users = $attributes->input('inviteUsers');
        $roomId = $attributes->input('room_id');
        $room = Room::query()
            ->where('roomId', '=', $roomId)
            ->where('status', '=', RoomStatusEnum::FALSE)
            ->first();
        if ($room->participants !== null) {
            $room->update([
                'participants' => $room->participants - count($users)
            ]);
            foreach ($users as $key => $user) {
                Mail::to($user)->send(new SendRoomIdMail($user, $roomId, $room));
            }
        }
        return $room;
    }

    private function getRoom($attributes): null|Builder|Model
    {
        return Room::query()
            ->where('roomId', '=', $attributes->input('roomId'))
            ->where('status', '=', RoomStatusEnum::FALSE)
            ->first();
    }
}
