<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class EventResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'title' => $this->title,
            'start_at' => $this->start_at,
            'end_at' => $this->end_at,
            'image_url' => $this->when(
                Storage::disk('public')->has($this->image_path),
                Storage::disk('public')->url($this->image_path)
            ),
            'tags' => $this->tags,
            'speakers' => $this->speakers,
            'description' => $this->description,
            'slug' => $this->slug,
            'status' => $this->status,
            'author' => UserResource::make($this->author),
        ];
    }
}
