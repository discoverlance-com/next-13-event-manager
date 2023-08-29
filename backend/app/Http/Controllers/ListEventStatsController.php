<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ListEventStatsController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        //
        $this->authorize('viewAny', Event::class);

        return Cache::remember('event_stats', 60 * 60 * 24, function () use ($request) {
            $publishedUserEvents = Event::where('user_id', $request->user()?->id)->published()->count();

            $archivedUserEvents = Event::where('user_id', $request->user()?->id)->archived()->count();

            $draftedUserEvents = Event::where('user_id', $request->user()?->id)->drafted()->count();

            $publishedEvents = Event::published()->count();

            $archivedEvents = Event::archived()->count();

            $draftedEvents = Event::drafted()->count();

            return response()->json([
                'user' => [
                    'publish' => $publishedUserEvents,
                    'archive' => $archivedUserEvents,
                    'draft' => $draftedUserEvents,
                ],
                'all' => [
                    'publish' => $publishedEvents,
                    'archive' => $archivedEvents,
                    'draft' => $draftedEvents,
                ]
            ], 200);
        });
    }
}
