<?php

namespace App\Http\Controllers;

use App\Http\Resources\EventResource;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ListUserEventsController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        //
        $this->authorize('viewAny', Event::class);
        return Cache::remember($request->user()->id . '_events', 60 * 60 * 1, function () use ($request) {
            return EventResource::collection(Event::where('user_id', $request->user()->id)->paginate())
                ->response()
                ->setStatusCode(200);
        });
    }
}
