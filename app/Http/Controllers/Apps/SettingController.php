<?php
declare(strict_types=1);

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Http\Requests\EndRoomRequest;
use App\Http\Requests\SendRoomRequest;
use App\Repositories\Contracts\SettingRepositoryInterface;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function __construct(public SettingRepositoryInterface $repository){}

    public function endRoom(EndRoomRequest $attributes): RedirectResponse
    {
        $this->repository->endRoom(attributes:  $attributes);
        return  redirect()->route('rooms.join');
    }

    public function sendEmail(Request $attributes)
    {
        dd($attributes);
    }

    public function inviteRoom(SendRoomRequest $attributes): RedirectResponse
    {
        $this->repository->inviteRoom(attributes: $attributes);
        return back();
    }
}
