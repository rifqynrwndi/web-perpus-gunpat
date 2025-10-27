<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Borrowing;

class FineController extends Controller
{
    public function index()
    {
        $borrowings = Borrowing::with('user', 'book')
            ->where('fine_amount', '>', 0)
            ->orderByDesc('created_at')
            ->paginate(10);

        return inertia('Admin/Fines/Index', [
            'borrowings' => $borrowings,
        ]);
    }

    public function markPaid(Borrowing $borrowing)
    {
        if ($borrowing->fine_amount <= 0) {
            return back()->with('error', 'Pinjaman ini tidak memiliki denda.');
        }

        $borrowing->update([
            'is_fine_paid' => true,
            'fine_paid_at' => now(),
        ]);

        return back()->with('success', 'Denda ditandai sudah dibayar.');
    }
}
