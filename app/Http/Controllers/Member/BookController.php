<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Category;
use App\Models\Reservation;
use App\Models\Borrowing;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();

        $query = Book::with('category');

        // Filter pencarian
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                ->orWhere('author', 'like', '%' . $request->search . '%');
            });
        }

        // Filter kategori
        if ($request->filled('category')) {
            $query->where('category_id', $request->category);
        }

        // Pagination + pertahankan query string (search, category)
        $books = $query
            ->orderBy('id')
            ->paginate(12)
            ->appends($request->only(['search', 'category'])) // penting agar pagination link tetap membawa query
            ->through(function ($book) use ($user) {
                // Cek status peminjaman & reservasi untuk user yang sedang login
                $isReserved = \App\Models\Reservation::where('user_id', $user->id)
                    ->where('book_id', $book->id)
                    ->whereIn('status', ['waiting', 'notified'])
                    ->exists();

                $isBorrowing = \App\Models\Borrowing::where('user_id', $user->id)
                    ->where('book_id', $book->id)
                    ->whereIn('status', ['requested', 'borrowed'])
                    ->exists();

                // Tambahkan atribut virtual
                $book->is_reserved = $isReserved;
                $book->is_borrowing = $isBorrowing;

                return $book;
            });

        // Ambil semua kategori
        $categories = Category::select('id', 'name')->get();

        return Inertia::render('Member/Books/Index', [
            'books' => $books,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category']),
        ]);
    }


    public function reserve(Book $book)
    {
        $userId = auth()->id();

        // 1) Kalau stok ada, harusnya pinjam langsung, bukan reservasi
        if ($book->available_copies > 0) {
            return back()->with('error', 'Buku masih tersedia, silakan pinjam langsung.');
        }

        // 2) Cek borrowing aktif (user sudah request atau sedang meminjam buku ini)
        $hasActiveBorrowing = Borrowing::where('user_id', $userId)
            ->where('book_id', $book->id)
            ->whereIn('status', ['requested', 'borrowed'])
            ->exists();

        if ($hasActiveBorrowing) {
            return back()->with('error', 'Kamu sudah meminjam atau sedang menunggu persetujuan untuk buku ini.');
        }

        // 3) Cek reservasi aktif (waiting / notified) untuk buku ini
        $hasActiveReservation = Reservation::where('user_id', $userId)
            ->where('book_id', $book->id)
            ->whereIn('status', ['waiting', 'notified'])
            ->exists();

        if ($hasActiveReservation) {
            return back()->with('error', 'Kamu sudah memiliki reservasi aktif untuk buku ini.');
        }

        // 4) Buat reservasi
        Reservation::create([
            'user_id' => $userId,
            'book_id' => $book->id,
            // status default: waiting
        ]);

        return back()->with('success', 'Buku berhasil dipesan. Kamu akan diberi tahu jika sudah tersedia.');
    }
}
