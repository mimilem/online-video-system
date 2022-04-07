<?php
declare(strict_types=1);

namespace App\Services;

use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Http;

final class EnableX
{
    public function createConnexion(): PendingRequest|RedirectResponse
    {
        try {
            return Http::withHeaders([
                'Content-Type: application/json',
            ])
                ->withBasicAuth(config('enableX.app_id'), config('enableX.app_key'));
        } catch (\Exception $exception) {
            return back()->withErrors($exception->getMessage())->withInput();
        }
    }
}
