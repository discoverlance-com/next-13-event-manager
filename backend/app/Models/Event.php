<?php

namespace App\Models;

use App\Enum\EventStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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

    public function author()
    {
    }
}
