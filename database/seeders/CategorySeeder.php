<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Teknologi', 'description' => 'Buku tentang teknologi dan komputer'],
            ['name' => 'Fiksi', 'description' => 'Novel dan karya sastra fiksi'],
            ['name' => 'Sains', 'description' => 'Buku ilmiah dan pengetahuan umum'],
            ['name' => 'Sejarah', 'description' => 'Buku sejarah dan biografi'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
