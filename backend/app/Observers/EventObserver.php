<?php

namespace App\Observers;

use App\Models\Event;
use Illuminate\Support\Facades\Cache;

class EventObserver
{
    /**
     * Handle the Event "created" event.
     */
    public function created(Event $event): void
    {
        //
        Cache::forget('all_events');
        Cache::forget('event_stats');
        Cache::forget($event->user_id . '_events');
    }

    /**
     * Handle the Event "updated" event.
     */
    public function updated(Event $event): void
    {
        //
        Cache::forget($event->slug . '_event');
        Cache::forget('event_stats');
        Cache::forget($event->user_id . '_events');
    }

    /**
     * Handle the Event "deleted" event.
     */
    public function deleted(Event $event): void
    {
        //
        Cache::forget($event->slug . '_event');
        Cache::forget('event_stats');
        Cache::forget($event->user_id . '_events');
    }

    /**
     * Handle the Event "restored" event.
     */
    public function restored(Event $event): void
    {
        //
    }

    /**
     * Handle the Event "force deleted" event.
     */
    public function forceDeleted(Event $event): void
    {
        //
    }
}
