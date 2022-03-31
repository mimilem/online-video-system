<?php
declare(strict_types=1);

namespace App\Providers;

use App\Repositories\Contracts\CreateRoomRepositoryInterface;
use App\Repositories\Contracts\CreateTokenRepositoryInterface;
use App\Repositories\CreateRoomRepository;
use App\Repositories\CreateTokenRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    protected array $repositories = [
        CreateRoomRepositoryInterface::class => CreateRoomRepository::class,
        CreateTokenRepositoryInterface::class => CreateTokenRepository::class,
    ];

    public function register()
    {
        //
    }

    public function boot()
    {
        foreach ($this->repositories as $interface => $implementation) {
            $this->app->bind($interface, $implementation);
        }
    }
}
