<?php
declare(strict_types=1);

namespace App\Http\Apis;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateTokenRequest;
use App\Repositories\Contracts\CreateTokenRepositoryInterface;
use Illuminate\Http\RedirectResponse;

class CreateTokenController extends Controller
{
    public function __construct(public CreateTokenRepositoryInterface $repository)
    {
    }

    public function createToken(CreateTokenRequest $attributes): RedirectResponse
    {
        $token = $this->repository->createToken(attributes: $attributes);

        return to_route('room.connect', [
            'token' => $token['0']['token'],
            'role' => base64_encode($token['1']),
            'roomId' => $attributes->input('meetingId'),
            'user_ref' => base64_encode($attributes->input('username')),
            'room' => base64_encode($token['2'])
        ]);
    }
}
