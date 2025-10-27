<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        $settings = Setting::all()->pluck('value', 'key');
        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'fine_rate_per_day' => 'required|numeric|min:0',
            'max_borrow_days' => 'required|integer|min:1',
            'auto_cancel_hours' => 'required|integer|min:1',
            'max_active_borrows_per_member' => 'required|integer|min:1',
        ]);

        foreach ($validated as $key => $value) {
            Setting::set($key, $value);
        }

        return back()->with('success', 'Pengaturan berhasil diperbarui.');
    }
}
