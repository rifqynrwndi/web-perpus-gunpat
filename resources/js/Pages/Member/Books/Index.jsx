import { Link, router, usePage } from "@inertiajs/react";
import MemberLayout from "../MemberLayout";
import { useEffect, useState } from "react";

export default function Index({ books, categories, filters }) {
    const { flash } = usePage().props;

    // State pencarian & kategori
    const [search, setSearch] = useState(filters.search || "");
    const [category, setCategory] = useState(filters.category || "");

    // Trigger perubahan filter
    const handleFilterChange = (newSearch, newCategory) => {
        router.get(
            route("member.books.index"),
            { search: newSearch, category: newCategory, page: 1 },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    // Debounce pencarian
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            handleFilterChange(search, category);
        }, 400);
        return () => clearTimeout(delayDebounce);
    }, [search, category]);

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col space-y-1">
                <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight">
                    Katalog Buku
                </h1>
                <p className="text-neutral-500 text-sm">
                    Jelajahi dan pinjam buku dari koleksi perpustakaan.
                </p>
            </div>

            {/* Flash Messages */}
            {flash.success && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg shadow-sm text-sm">
                    {flash.success}
                </div>
            )}
            {flash.error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg shadow-sm text-sm">
                    {flash.error}
                </div>
            )}

            {/* Search & Filter */}
            <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
                <input
                    type="text"
                    name="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari judul atau penulis..."
                    className="flex-1 px-4 py-2.5 border border-neutral-300 rounded-lg text-sm text-neutral-800 placeholder-neutral-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
                <select
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="sm:w-56 px-4 py-2.5 border border-neutral-300 rounded-lg text-sm text-neutral-800 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                >
                    <option value="">Semua Kategori</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Book Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.data.length > 0 ? (
                    books.data.map((book, i) => (
                        <div
                            key={book.id}
                            className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-[2px]"
                            style={{
                                animation: `fadeIn 0.4s ease-out ${i * 0.05}s both`,
                            }}
                        >
                            <div className="flex flex-col h-full justify-between space-y-3">
                                {/* Info */}
                                <div className="space-y-2">
                                    <h2 className="text-base font-semibold text-neutral-900 line-clamp-2">
                                        {book.title}
                                    </h2>
                                    <p className="text-sm text-neutral-500">
                                        {book.author || "Penulis tidak diketahui"}
                                    </p>
                                    {book.category && (
                                        <span className="inline-block bg-neutral-100 text-neutral-700 text-xs px-2 py-0.5 rounded-md">
                                            {book.category.name}
                                        </span>
                                    )}
                                    <p className="text-sm text-neutral-600 mt-2">
                                        {book.available_copies > 0 ? (
                                            <span className="flex items-center gap-1.5">
                                                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                                                {book.available_copies} eksemplar tersedia
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1.5">
                                                <span className="w-2 h-2 rounded-full bg-neutral-400"></span>
                                                Sedang tidak tersedia
                                            </span>
                                        )}
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="space-y-2">
                                    <button
                                    onClick={() => {
                                        // Tentukan route mana yang akan dipanggil berdasarkan stok
                                        if (book.available_copies > 0) {
                                            // Jika stok ada, panggil route peminjaman
                                            router.post(route("member.borrow.store"), {
                                                book_id: book.id,
                                            });
                                        } else {
                                            // Jika stok habis (Reservasi), panggil route reservasi
                                            router.post(
                                                route("member.books.reserve", book.id), // Mengirim ID sebagai parameter route
                                                {}, // Tidak perlu kirim data tambahan
                                                { preserveScroll: true }
                                            );
                                        }
                                    }}
                                    disabled={book.is_reserved || book.is_borrowing}
                                    className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium transition active:scale-[0.98] ${
                                        book.available_copies > 0
                                            ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                                            : "bg-amber-500 hover:bg-amber-600 text-white" // Ini jadi tombol Reservasi
                                    } ${
                                        book.is_reserved || book.is_borrowing
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }`}
                                >
                                    {book.is_borrowing
                                        ? "Sedang Dipinjam"
                                        : book.is_reserved
                                        ? "Sudah Dipesan"
                                        : book.available_copies > 0
                                        ? "Pinjam Buku"
                                        : "Reservasi"}
                                </button>
                                    {book.file_path && (
                                        <div className="flex gap-2">
                                            <a
                                                href={`/storage/${book.file_path}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition active:scale-[0.98] text-center"
                                            >
                                                Baca E-book
                                            </a>
                                            <a
                                                href={`/storage/${book.file_path}`}
                                                download
                                                className="flex-1 px-4 py-2 bg-neutral-600 hover:bg-neutral-700 text-white text-sm font-medium rounded-lg transition active:scale-[0.98] text-center"
                                            >
                                                Unduh
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                        <p className="text-neutral-400 text-5xl mb-3">📚</p>
                        <h3 className="text-lg font-semibold text-neutral-800">
                            Tidak ada buku ditemukan
                        </h3>
                        <p className="text-sm text-neutral-500 max-w-sm">
                            Coba ubah kategori atau kata kunci pencarian kamu.
                        </p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {books.links && books.data.length > 0 && (
                <div className="flex justify-center gap-2 pt-6">
                    {books.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url || "#"}
                            preserveScroll
                            preserveState
                            className={`px-3 py-1.5 rounded text-sm font-medium transition ${
                                link.active
                                    ? "bg-red-600 text-white"
                                    : link.url
                                    ? "bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-50"
                                    : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(6px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}

Index.layout = (page) => <MemberLayout>{page}</MemberLayout>;
