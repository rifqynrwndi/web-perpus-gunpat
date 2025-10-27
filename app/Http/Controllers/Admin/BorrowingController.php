<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Borrowing;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Setting;

class BorrowingController extends Controller
{
    public function index()
    {
        $borrowings = Borrowing::with(['book', 'user'])
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('Admin/Borrowings/Index', [
            'borrowings' => $borrowings,
        ]);
    }

    public function update(Request $request, Borrowing $borrowing)
    {
        $action = $request->action;

        // === APPROVE REQUEST ===
        if ($action === 'approve' && $borrowing->status === 'requested') {
            $borrowDays = (int) Setting::get('max_borrow_days', 7);

            $borrowing->update([
                'status' => 'borrowed',
                'borrow_date' => now(),
                'due_date' => now()->addDays($borrowDays),
            ]);

            return back()->with('success', 'Peminjaman disetujui.');
        }

        // === RETURN BOOK ===
        if ($action === 'return' && $borrowing->status === 'borrowed') {
            $fine = 0;
            $now = now();

            if ($now->gt($borrowing->due_date)) {
                $daysLate = $now->diffInDays($borrowing->due_date);
                $fineRate = (int) Setting::get('fine_rate_per_day', 1000);
                $fine = $daysLate * $fineRate * -1;
            }

            $borrowing->update([
                'status' => 'returned',
                'return_date' => $now,
                'fine_amount' => $fine,
            ]);

            // Ambil buku terkait
            $book = $borrowing->book;

            // Tambahkan stok kembali
            $book->increment('available_copies', 1);

            // === CEK RESERVASI MENUNGGU ===
            $nextReservation = \App\Models\Reservation::where('book_id', $book->id)
                ->where('status', 'waiting')
                ->orderBy('created_at')
                ->first();

            if ($nextReservation) {
                // Hitung batas waktu pinjam
                $borrowDays = (int) \App\Models\Setting::get('max_borrow_days', 7);

                // Buat record peminjaman baru
                \App\Models\Borrowing::create([
                    'user_id' => $nextReservation->user_id,
                    'book_id' => $book->id,
                    'status' => 'requested',
                    'borrow_date' => now(),
                    'due_date' => now()->addDays($borrowDays),
                ]);

                // Update status reservasi
                $nextReservation->update([
                    'status' => 'notified',
                    'notified_at' => now(),
                ]);

                // Kurangi stok lagi karena langsung dipinjam
                $book->decrement('available_copies', 1);
            }

            return back()->with('success', 'Buku dikembalikan. Denda: Rp ' . number_format($fine, 0, ',', '.'));
        }

        return back()->withErrors(['error' => 'Aksi tidak valid.']);
    }
}
