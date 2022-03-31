<?php
declare(strict_types=1);

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;

class RoomsAppController extends Controller
{
    public function index(Request $request, $room, $type, $reference): Renderable
    {
        return view('apps.pages.index', [
            'requests' => $request,
            'room', $room,
            'type' => $type,
            'reference' => $reference
        ]);
    }
}
