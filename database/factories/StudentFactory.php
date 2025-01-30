<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Student;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'StudentName' => $this->faker->name,
            'Major' => $this->faker->word,
            'Email' => $this->faker->unique()->safeEmail(),
            'Phone' => $this->faker->numerify(str_repeat('#', 10)),
        ];
    }
}
