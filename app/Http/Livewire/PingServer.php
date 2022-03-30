<?php
declare(strict_types=1);

namespace App\Http\Livewire;

use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Livewire\Component;

class PingServer extends Component
{
    public float $ping;

    public function showPing()
    {
        $this->ping = round(microtime(true) * 1000) -  round(LARAVEL_START * 1000);
    }

    public function render(): Factory|View|Application
    {
        return view('livewire.ping-server');
    }
}
