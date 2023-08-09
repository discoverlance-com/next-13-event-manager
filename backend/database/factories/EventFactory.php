<?php

namespace Database\Factories;

use App\Enum\EventStatus;
use App\Helpers\Helpers;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $start_at = $this->faker->dateTimeBetween('now', 'now +6 months', 'utc');
        $title = $this->faker->company();
        $statuses = Helpers::enumValuesToArray(EventStatus::class);

        return [
            //
            'title' => $title,
            'start_at' => $start_at,
            'end_at' => $this->faker->dateTimeBetween($start_at, $start_at->format('Y-m-d H:i:s') . ' +1 month', 'utc'),
            'image_path' => 'events/images/7b1afb4381e26b8e474a3dadd14a8ef8.png',
            'tags' => $this->faker->randomElements(
                [
                    'Laundry',
                    'Tech',
                    'Python',
                    'Database',
                    'Frontend',
                    'Backend',
                    'Artificial Intelligence',
                    'Food',
                    'Carepentary',
                    'Farming',
                ],
                2
            ),
            'speakers' => $this->faker->words(3),
            'description' => $this->faker->paragraphs(4, true),
            'slug' => str($title)->slug(),
            'status' => $this->faker->randomElement($statuses),
            'user_id' => User::factory(),
        ];
    }
}
