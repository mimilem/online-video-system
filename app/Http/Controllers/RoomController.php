<?php
declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\CreateRoomRequest;
use App\Repositories\Contracts\CreateRoomRepositoryInterface;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\RedirectResponse;

class RoomController extends Controller
{
    public function __construct(public CreateRoomRepositoryInterface $repository){}

    public function joinRoom(): Renderable
    {
        return view('apps.index');
    }

    public function createRoom(): Renderable
    {
        return view('apps.create');
    }

    public function storeRoom(CreateRoomRequest $attributes): RedirectResponse
    {
        $this->repository->createRoom(attributes: $attributes);
        return redirect()->route('rooms.join')->with('success', "Une mail a ete envoyer a votre address avec les informations necessaire pour rejoindre le room chat");
    }
}
