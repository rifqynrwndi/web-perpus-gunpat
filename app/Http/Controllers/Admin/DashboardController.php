<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\User;
use App\Models\Borrowing;
use Illuminate\Support\Facades\DB;  
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalBooks = Book::count();
        $totalMembers = User::where('role', 'member')->count();
        $activeBorrowings = Borrowing::whereIn('status', ['requested', 'borrowed'])->count();
        $totalFine = Borrowing::sum('fine_amount');

        // Statistik peminjaman per bulan (12 bulan terakhir)
        $borrowingsPerMonth = Borrowing::select(
            DB::raw("DATE_FORMAT(borrow_date, '%Y-%m') as month"),
            DB::raw('COUNT(*) as total')
        )
        ->whereNotNull('borrow_date')
        ->groupBy('month')
        ->orderBy('month')
        ->get()
        ->map(function ($item) {
            return [
                'month' => date('M Y', strtotime($item->month . '-01')),
                'total' => $item->total,
            ];
        });

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'books' => $totalBooks,
                'members' => $totalMembers,
                'borrowings' => $activeBorrowings,
                'fines' => $totalFine,
            ],
            'chartData' => $borrowingsPerMonth,
        ]);
    }
}
