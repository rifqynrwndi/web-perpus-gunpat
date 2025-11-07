<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Borrowing;
use App\Models\Setting;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

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
        $request->validate([
            'action' => 'required|string|in:approve,reject,return',
        ]);

        $action = $request->input('action');
        $book = $borrowing->book;

        if ($action === 'approve' && $borrowing->status === 'requested') {
            $borrowDays = (int) Setting::get('max_borrow_days', 7);

            $borrowing->update([
                'status' => 'borrowed',
                'borrow_date' => now(),
                'due_date' => now()->addDays($borrowDays),
            ]);

            return back()->with('success', 'Peminjaman disetujui.');
        }

        if ($action === 'reject' && $borrowing->status === 'requested') {
            $borrowing->update([
                'status' => 'rejected',
            ]);

            $book->increment('available_copies', 1);
            $this->checkNextReservation($book);

            return back()->with('success', 'Permintaan peminjaman ditolak.');
        }

        if ($action === 'return' && $borrowing->status === 'borrowed') {
            $fine = 0;
            $now = now();
            $dueDate = new Carbon($borrowing->due_date);

            if ($now->gt($dueDate)) {
                $daysLate = $now->diffInDays($dueDate);
                $fineRate = (int) Setting::get('fine_rate_per_day', 1000);
                $fine = $daysLate * $fineRate;
            }

            $borrowing->update([
                'status' => 'returned',
                'return_date' => $now,
                'fine_amount' => $fine,
            ]);

            $book->increment('available_copies', 1);
            $this->checkNextReservation($book);

            return back()->with('success', 'Buku dikembalikan. Denda: Rp ' . number_format($fine, 0, ',', '.'));
        }

        return back()->withErrors(['error' => 'Aksi tidak valid atau status tidak sesuai.']);
    }

    private function checkNextReservation($book)
    {
        $nextReservation = Reservation::where('book_id', $book->id)
            ->where('status', 'waiting')
            ->orderBy('created_at')
            ->first();

        if ($nextReservation) {

            Borrowing::create([
                'user_id' => $nextReservation->user_id,
                'book_id' => $book->id,
                'status' => 'requested',
            ]);

            $nextReservation->update([
                'status' => 'notified',
                'notified_at' => now(),
            ]);

            $book->decrement('available_copies', 1);
        }
    }
}
