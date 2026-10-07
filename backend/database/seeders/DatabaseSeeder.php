<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create Admin User for Filament
        User::updateOrCreate(
            ['email' => 'admin@portfolio.com'],
            [
                'name' => 'Fortunate Misihairahwi',
                'password' => Hash::make('password'),
            ]
        );

        // Seed initial portfolio projects
        $projects = [
            [
                'num' => '01',
                'name' => 'E-Commerce Store',
                'desc' => 'Full-featured e-commerce platform with product listings, cart, and checkout flow.',
                'category' => 'Full-Stack',
                'tags' => ['JavaScript', 'React', 'Node.js'],
                'stars' => '12',
                'href' => 'https://github.com/Fortunate-ak/E-commerce-store',
                'live' => 'https://your-hosted-link.com/ecommerce',
                'color' => '#06b6d4',
                'is_featured' => true,
                'display_order' => 1,
            ],
            [
                'num' => '02',
                'name' => 'Quick-Buy Engine',
                'desc' => 'Fast, intelligent purchasing engine built with TypeScript for streamlined buying workflows.',
                'category' => 'Frontend',
                'tags' => ['TypeScript', 'Next.js', 'REST API'],
                'stars' => '8',
                'href' => 'https://github.com/Fortunate-ak/quick-buy-engine',
                'live' => 'https://your-hosted-link.com/quickbuy',
                'color' => '#8b5cf6',
                'is_featured' => true,
                'display_order' => 2,
            ],
            [
                'num' => '03',
                'name' => 'MyApp',
                'desc' => 'Full-stack web application showcasing Django backend with a modern JavaScript frontend.',
                'category' => 'Full-Stack',
                'tags' => ['Django', 'React', 'Python'],
                'stars' => '15',
                'href' => 'https://github.com/Fortunate-ak/MyApp',
                'live' => 'https://your-hosted-link.com/myapp',
                'color' => '#10b981',
                'is_featured' => true,
                'display_order' => 3,
            ],
        ];

        foreach ($projects as $p) {
            Project::updateOrCreate(['name' => $p['name']], $p);
        }
    }
}
