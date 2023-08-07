<?php

namespace App\Helpers;

use Illuminate\Support\Collection;

final class Helpers
{
    public static function enumValuesToArray(string $enum): array
    {
        return collect($enum::cases())->map(fn ($case) => $case->value)->toArray();
    }

    public static function enumValuesToCollection(string $enum): Collection
    {
        return collect($enum::cases())->map(fn ($case) => $case->value);
    }

    public static function enumToCollection(string $enum): Collection
    {
        return collect($enum::cases());
    }
}
