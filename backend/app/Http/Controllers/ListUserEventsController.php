<?php

namespace App\Http\Controllers;

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
        $this->authorize('viewAny');
        return response()->json(Event::where('user_id', $request->user()->id)->get(), 200);
    }
}
