<?php

namespace App\Console\Commands;

use App\Enums\RoomStatusEnum;
use App\Models\Room;
use Carbon\Carbon;
use Illuminate\Console\Command;

class RoomCommand extends Command
{
    /**
     * @var string
     */
    protected $signature = 'aperi:remove-room';

    /**
     * @var string
     */
    protected $description = 'Command to delete all conferences whose status is true';

    /**
     * @return int
     */
    public function handle()
    {
        $rooms = Room::query()
            ->where('status', '=', RoomStatusEnum::TRUE)
            ->where('schedule', '<=', Carbon::now()->addDays(2))
            ->get();
        foreach ($rooms as $room) {
            $room->delete();
        }
        $this->comment("Room supprimer avec success");
        return 0;
    }
}
