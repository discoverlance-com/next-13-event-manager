<?php

namespace App\Enum;

enum EventStatus: string
{
    case DRAFT = 'draft';
    case PUBLISH = 'publish';
    case ARCHIVE = 'archive';

    public function status()
    {
        return match ($this) {
            EventStatus::DRAFT => 'draft',
            EventStatus::PUBLISH => 'publish'
        };
    }
}
