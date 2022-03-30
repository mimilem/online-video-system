<?php
declare(strict_types=1);

namespace App\Http\Apis;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateRoomRequest;
use App\Repositories\Contracts\CreateRoomRepositoryInterface;

class CreateRoomController extends Controller
{
    public function __construct(public CreateRoomRepositoryInterface $repository){}

    public function createRoom(CreateRoomRequest $attributes)
    {

    }
}
