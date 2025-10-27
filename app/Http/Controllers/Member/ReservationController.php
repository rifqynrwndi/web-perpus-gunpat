<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationController extends Controller
{
    public function index()
    {
        $reservations = Reservation::with('book:id,title')
            ->where('user_id', auth()->id())
            ->whereIn('status', ['waiting', 'notified', 'cancelled'])
            ->latest()
            ->get();

        return Inertia::render('Member/Reservations/Index', [
            'reservations' => $reservations,
        ]);
    }

    public function destroy(Reservation $reservation)
    {
        $userId = auth()->id();

        if ($reservation->user_id !== $userId) {
            abort(403, 'Tidak boleh menghapus reservasi orang lain.');
        }

        // Kalau masih waiting (belum dibuatkan borrowing sama sistem)
        if ($reservation->status === 'waiting') {
            $reservation->update(['status' => 'cancelled']);
            return back()->with('success', 'Reservasi berhasil dibatalkan.');
        }

        // Kalau sudah sampai tahap notified (berarti udah dibuatkan borrowing auto-request)
        if ($reservation->status === 'notified') {
            $borrowing = \App\Models\Borrowing::where('user_id', $userId)
                ->where('book_id', $reservation->book_id)
                ->whereIn('status', ['requested', 'borrowed'])
                ->latest()
                ->first();

            if ($borrowing) {
                $borrowing->update(['status' => 'cancelled']);
                $borrowing->book->increment('available_copies', 1);
            }

            // Optional: ubah reservasi jadi "processed" biar gak ikut antre lagi
            $reservation->update(['status' => 'processed']);

            return back()->with('success', 'Peminjaman dari reservasi berhasil dibatalkan.');
        }

        return back()->with('error', 'Reservasi tidak valid untuk dibatalkan.');
    }
}
