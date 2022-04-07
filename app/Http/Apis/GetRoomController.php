<?php
declare(strict_types=1);

namespace App\Http\Apis;

use App\Http\Controllers\Controller;
use App\Repositories\Contracts\GetRoomRepositoryInterface;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;

class GetRoomController extends Controller
{
    public function __construct(public GetRoomRepositoryInterface $repository)
    {
    }

    public function index(Request $request): Renderable
    {
        $room = $this->repository->getRoom(attributes: $request);
        return view('apps.index', [
            'roomId' => $request->route('room'),
            'room' => $room
        ]);
    }
}
