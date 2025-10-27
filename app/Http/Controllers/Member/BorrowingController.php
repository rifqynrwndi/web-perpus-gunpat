<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Borrowing;
use App\Models\Setting;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Http\Request;

class BorrowingController extends Controller
{
    public function index()
    {
        $borrowings = Borrowing::with(['book', 'book.category'])
            ->where('user_id', Auth::id())
            ->orderByDesc('created_at')
            ->paginate(10);

        return Inertia::render('Member/Borrowings/Index', [
            'borrowings' => $borrowings,
        ]);
    }

    public function store(Request $request)
    {
        $book = Book::findOrFail($request->book_id);

        // Cek stok
        if ($book->available_copies <= 0) {
            return back()->withErrors(['error' => 'Buku tidak tersedia untuk dipinjam.']);
        }

        $userId = $request->user()->id;

        // Cek batas maksimum pinjaman aktif
        $maxActive = (int) Setting::get('max_active_borrows_per_member', 3);

        $activeCount = Borrowing::where('user_id', $userId)
            ->whereIn('status', ['requested', 'borrowed'])
            ->count();

        if ($activeCount >= $maxActive) {
            return back()->with('error', "Kamu sudah mencapai batas maksimum $maxActive pinjaman aktif.");
        }

        // Cek duplikasi peminjaman buku yang sama
        $alreadyBorrowed = Borrowing::where('user_id', $userId)
            ->where('book_id', $book->id)
            ->whereIn('status', ['requested', 'borrowed'])
            ->exists();

        if ($alreadyBorrowed) {
            return back()->with('error', 'Kamu sudah meminjam atau sedang menunggu konfirmasi untuk buku ini.');
        }

        // Buat request baru
        Borrowing::create([
            'user_id' => $userId,
            'book_id' => $book->id,
            'status' => 'requested',
        ]);

        $book->decrement('available_copies', 1);

        return back()->with('success', 'Permintaan peminjaman dikirim. Tunggu konfirmasi dari admin.');
    }

    public function cancel(Borrowing $borrowing)
    {
        $userId = auth()->id();

        // Pastikan user tidak bisa membatalkan peminjaman orang lain
        if ($borrowing->user_id !== $userId) {
            abort(403, 'Tidak boleh membatalkan peminjaman orang lain.');
        }

        // Hanya boleh dibatalkan jika status masih "requested"
        if ($borrowing->status !== 'requested') {
            return back()->with('error', 'Peminjaman ini sudah diproses dan tidak dapat dibatalkan.');
        }

        // Ubah status menjadi cancelled
        $borrowing->update(['status' => 'cancelled']);

        // Kembalikan stok buku
        $borrowing->book->increment('available_copies', 1);

        return back()->with('success', 'Permintaan peminjaman berhasil dibatalkan.');
    }
}
