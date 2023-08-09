<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpsertEventRequest;
use App\Models\Event;

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
        return response()->json(Event::upToDate()->paginate(10), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UpsertEventRequest $request)
    {
        $data = $request->validated();
        $event = Event::create([...$data, 'user_id' => $request->user()]);

        return response()->json($event, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        return response()->json($event, 200);
    }

    /**
     * Update the given event
     */
    public function update(UpsertEventRequest $request, Event $event)
    {
        $data = $request->validated();
        $event->update([...$data, $request->user()]);

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
