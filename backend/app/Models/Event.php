<?php

namespace App\Models;

use App\Enum\EventStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'start_at',
        'end_at',
        'image_path',
        'tags',
        'speakers',
        'description',
        'slug',
        'status',
        'user_id',
    ];

    protected $casts = [
        'tags' => 'array',
        'speakers' => 'array',
        'start_at' => 'date:l jS F Y h:i A',
        'end_at' => 'date:l jS F Y h:i A',
        'status' => EventStatus::class,
    ];

    protected static function booted()
    {
        static::saving(function (Event $event) {
            $event['slug'] = str($event['title'])->slug();
        });
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    /**
     * Scope a query to only include events that have not ended
     */
    public function scopeUpToDate(Builder $query): void
    {
        $query->where('end_at', '>', now())->whereNot('status', EventStatus::ARCHIVE);
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
