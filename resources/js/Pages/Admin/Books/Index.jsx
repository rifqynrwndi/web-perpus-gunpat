import { Link, usePage, router } from "@inertiajs/react";
import AdminLayout from "../AdminLayout";
import { useEffect, useState } from "react";

export default function Index({ books, categories, filters }) {
    const { flash } = usePage().props;
    const [search, setSearch] = useState(filters.search || "");
    const [category, setCategory] = useState(filters.category || "");

    // 🔁 Realtime filtering dengan debounce
    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                route("admin.books.index"),
                { search, category },
                { preserveState: true, replace: true }
            );
        }, 400); // 0.4 detik delay biar smooth

        return () => clearTimeout(timeout);
    }, [search, category]);

    return (
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                        Daftar Buku
                    </h1>
                    <p className="text-sm text-gray-500">
                        Kelola koleksi buku perpustakaan
                    </p>
                </div>

                <Link
                    href={route("admin.books.create")}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
                >
                    + Tambah Buku
                </Link>
            </div>

            {/* Flash Message */}
            {flash.success && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg shadow-sm text-sm">
                    {flash.success}
                </div>
            )}

            {/* Filter Bar */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Cari judul atau penulis..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full sm:w-64 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    />

                    {/* Kategori */}
                    <div className="relative">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="appearance-none pr-8 pl-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-gray-700"
                    >
                        <option value="">Semua Kategori</option>
                        {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                        ))}
                    </select>

                    {/* Ikon panah */}
                    <svg
                        className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-5 py-3 text-left font-semibold text-gray-600">
                                Judul
                            </th>
                            <th className="px-5 py-3 text-left font-semibold text-gray-600">
                                Penulis
                            </th>
                            <th className="px-5 py-3 text-left font-semibold text-gray-600">
                                Kategori
                            </th>
                            <th className="px-5 py-3 text-left font-semibold text-gray-600">
                                Stok
                            </th>
                            <th className="px-5 py-3 text-left font-semibold text-gray-600">
                                Aksi
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {books.data.length > 0 ? (
                            books.data.map((book) => (
                                <tr
                                    key={book.id}
                                    className="border-b last:border-none hover:bg-gray-50 transition-all"
                                >
                                    <td className="px-5 py-3 font-medium text-gray-900">
                                        {book.title}
                                    </td>
                                    <td className="px-5 py-3 text-gray-600">
                                        {book.author || "-"}
                                    </td>
                                    <td className="px-5 py-3 text-gray-600">
                                        {book.category?.name || "-"}
                                    </td>
                                    <td className="px-5 py-3">
                                        {book.available_copies > 0 ? (
                                            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2.5 py-1 rounded-full">
                                                {book.available_copies}/
                                                {book.total_copies} tersedia
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 border border-rose-200 text-xs px-2.5 py-1 rounded-full">
                                                Stok habis
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-5 py-3 space-x-3">
                                        <Link
                                            href={route("admin.books.edit", book.id)}
                                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                                        >
                                            Edit
                                        </Link>

                                        <Link
                                            as="button"
                                            method="delete"
                                            href={route("admin.books.destroy", book.id)}
                                            onClick={(e) => {
                                                if (
                                                    !confirm(
                                                        `Apakah kamu yakin ingin menghapus buku "${book.title}"?`
                                                    )
                                                ) {
                                                    e.preventDefault();
                                                }
                                            }}
                                            className="text-rose-600 hover:text-rose-800 font-medium text-sm"
                                        >
                                            Hapus
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center text-gray-500 py-10 italic"
                                >
                                    Belum ada data buku.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {books.links.length > 3 && (
                <div className="flex justify-center mt-6 space-x-2">
                    {books.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url || "#"}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className={`px-3 py-1 rounded-md border text-sm ${
                                link.active
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                            } ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

Index.layout = (page) => <AdminLayout>{page}</AdminLayout>;
