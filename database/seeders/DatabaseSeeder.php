<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\News;
use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        //  `name`, `slug`, `images`, `source`, `company_id`, `country_id`, `condition_level`, `guarantee`, `price`, `status`, `description`
        for ($i = 0; $i < 100; $i++) {
            // News::insert([
            //     'subject' => fake()->sentence(),
            //     'slug' => Str::slug(fake()->sentence()),
            //     'posted_at' => now(),
            //     'article' => fake()->paragraph(),
            //     'view' => rand(100, 1000),
            // ]);
            // Product::insert([
            //     'name' => fake()->sentence(),
            //     'slug' => Str::slug(fake()->sentence()),
            //     'images' => fake()->imageUrl(),
            //     'source' => fake()->sentence(),
            //     'company_id' => rand(1, 4),
            //     'country_id' => rand(1, 7),
            //     'condition_level' => rand(1, 10),
            //     'guarantee' => rand(1, 10),
            //     'price' => rand(1000, 10000),
            //     'status' => rand(0, 1),
            //     'description' => fake()->paragraph(),
            // ]);
        }
    }
}
