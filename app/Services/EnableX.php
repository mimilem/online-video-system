<?php
declare(strict_types=1);

namespace App\Services;

use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Http;

final class EnableX
{
    public function createConnexion(): Response|PendingRequest|Application|ResponseFactory
    {
        try {
            return Http::withHeaders([
                'Content-Type: application/json',
            ])
                ->withBasicAuth(config('enableX.app_id'),config('enableX.app_key'));
        } catch (HttpResponseException $exception) {
            return response([
                'messages' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
        }
    }
}
