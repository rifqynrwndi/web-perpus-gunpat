<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class BookController extends Controller
{
    public function index(Request $request)
    {
        $query = Book::query()->with('category');

        if ($request->search) {
            $query->where('title', 'like', "%{$request->search}%")
                ->orWhere('author', 'like', "%{$request->search}%");
        }

        if ($request->category) {
            $query->where('category_id', $request->category);
        }

        $books = $query->latest()->paginate(10)->withQueryString();

        return inertia('Admin/Books/Index', [
            'books' => $books,
            'categories' => Category::all(),
            'filters' => $request->only(['search', 'category']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Books/Create', [
            'categories' => Category::all(['id', 'name']),
        ]);
    }



    public function store(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|string|unique:books,id|max:20',
            'title' => 'required|string|max:255',
            'author' => 'nullable|string|max:255',
            'isbn' => 'nullable|string|max:50',
            'category_id' => 'required|exists:categories,id',
            'total_copies' => 'required|integer|min:1',
            'available_copies' => 'nullable|integer|min:0',
            'description' => 'nullable|string',
            'file' => 'nullable|mimes:pdf|max:20480',
            'cover' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        // Jika available_copies tidak diisi, samakan dengan total_copies
        if (!isset($validated['available_copies'])) {
            $validated['available_copies'] = $validated['total_copies'];
        }

        // Validasi jumlah stok
        if ($validated['available_copies'] > $validated['total_copies']) {
            return back()->withErrors([
                'available_copies' => 'Jumlah buku tersedia tidak boleh melebihi total eksemplar.',
            ])->withInput();
        }

        // Upload file jika ada
        $path = null;
        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('books', 'public');
        }

        // Upload cover jika ada
        $coverPath = null;
        if ($request->hasFile('cover')) {
            $coverPath = $request->file('cover')->store('covers', 'public');
        }
        $validated['cover_path'] = $coverPath;

        // Tambahkan file_path ke data
        $validated['file_path'] = $path;

        Book::create($validated);

        return redirect()->route('admin.books.index')->with('success', 'Buku berhasil ditambahkan!');
    }


    public function edit(Book $book)
    {
        return Inertia::render('Admin/Books/Edit', [
            'book' => $book->load('category'),
            'categories' => Category::all(['id', 'name']),
        ]);
    }

    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
            'id' => 'required|string|max:20',
            'title' => 'required|string|max:255',
            'author' => 'nullable|string|max:255',
            'isbn' => 'nullable|string|max:50',
            'category_id' => 'required|exists:categories,id',
            'total_copies' => 'required|integer|min:1',
            'available_copies' => 'nullable|integer|min:0',
            'description' => 'nullable|string',
            'file' => 'nullable|mimes:pdf|max:20480',
            'cover' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',

        ]);

        // Jika available_copies tidak diisi, samakan dengan total_copies
        if (!isset($validated['available_copies'])) {
            $validated['available_copies'] = $validated['total_copies'];
        }

        // Validasi jumlah stok
        if ($validated['available_copies'] > $validated['total_copies']) {
            return back()->withErrors([
                'available_copies' => 'Jumlah buku tersedia tidak boleh melebihi total eksemplar.',
            ])->withInput();
        }

        // Jika admin upload file baru
        if ($request->hasFile('file')) {
            // Hapus file lama jika ada
            if ($book->file_path && Storage::disk('public')->exists($book->file_path)) {
                Storage::disk('public')->delete($book->file_path);
            }

            // Simpan file baru
            $validated['file_path'] = $request->file('file')->store('books', 'public');
        }

        if ($request->hasFile('cover')) {
            // hapus cover lama jika ada
            if ($book->cover_path && Storage::disk('public')->exists($book->cover_path)) {
                Storage::disk('public')->delete($book->cover_path);
            }

            $validated['cover_path'] = $request->file('cover')->store('covers', 'public');
        }


        $book->update($validated);

        return redirect()->route('admin.books.index')->with('success', 'Buku berhasil diperbarui!');
    }

    public function destroy(Book $book)
    {
        $book->delete();

        return redirect()->back()->with('success', 'Buku dihapus.');
    }
}
