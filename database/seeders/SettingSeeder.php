<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Setting;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            ['key' => 'fine_rate_per_day', 'value' => '1000'],
            ['key' => 'auto_cancel_hours', 'value' => '24'],
            ['key' => 'max_borrow_days', 'value' => '7'],
            ['key' => 'max_active_borrows_per_member', 'value' => '5'],
        ];

        foreach ($settings as $setting) {
            Setting::create($setting);
        }
    }
}
