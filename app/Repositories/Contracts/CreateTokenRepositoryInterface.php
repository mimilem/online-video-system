<?php
declare(strict_types=1);

namespace App\Repositories\Contracts;

interface CreateTokenRepositoryInterface
{
    public function createToken($attributes);
}
