<?php
declare(strict_types=1);

namespace App\Providers;

use App\Repositories\Contracts\CreateRoomRepositoryInterface;
use App\Repositories\CreateRoomRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        //
    }

    public function boot()
    {
        $this->app->bind(
            CreateRoomRepositoryInterface::class,
            CreateRoomRepository::class
        );
    }
}
