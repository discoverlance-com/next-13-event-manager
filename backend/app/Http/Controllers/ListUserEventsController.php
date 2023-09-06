<?php

namespace App\Http\Controllers;

use App\Http\Resources\EventResource;
use App\Models\Event;
use Illuminate\Http\Request;

class ListUserEventsController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        //
        $this->authorize('viewAny', Event::class);
        return EventResource::collection(Event::where('user_id', $request->user()->id)->paginate(10))
                ->response()
                ->setStatusCode(200);
    }
}
