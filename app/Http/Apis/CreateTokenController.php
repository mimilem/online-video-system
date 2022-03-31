<?php
declare(strict_types=1);

namespace App\Http\Apis;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateTokenRequest;
use App\Repositories\Contracts\CreateTokenRepositoryInterface;

class CreateTokenController extends Controller
{
    public function __construct(public CreateTokenRepositoryInterface $repository){}

    public function createToken(CreateTokenRequest $attributes)
    {
        return $this->repository->createToken(attributes: $attributes);
    }
}
