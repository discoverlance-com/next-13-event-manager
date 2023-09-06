<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpsertEventRequest;
use App\Http\Resources\EventResource;
use App\Models\Event;
use Illuminate\Support\Facades\Cache;

class EventController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Event::class, 'event');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Cache::remember('all_events', 60 * 60 * 24, function () {
            return EventResource::collection(Event::upToDate()->get())
                ->response()
                ->setStatusCode(200);
        });
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UpsertEventRequest $request)
    {
        $data = $request->validated();
        //TODO: save/store file if present
        $event = Event::create([...$data, 'user_id' => $request->user()->id]);

        return EventResource::make($event)
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        return Cache::remember($event->slug . '_event', 60 * 60 * 24, function () use ($event) {
            return EventResource::make($event)
                ->response()
                ->setStatusCode(200);
        });
    }

    /**
     * Update the given event
     */
    public function update(UpsertEventRequest $request, Event $event)
    {
        $data = $request->validated();
        // TODO: update stored file if file is in request
        $event->update([...$data]);

        return response()->json([], 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        //
        $event->delete();
        return response()->json([], 204);
    }
}
