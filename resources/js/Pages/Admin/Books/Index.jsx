import { Link, usePage } from "@inertiajs/react";
import AdminLayout from "../AdminLayout";

export default function Index({ books }) {
    const { flash } = usePage().props;

    return (
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
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
                                            href={route(
                                                "admin.books.edit",
                                                book.id
                                            )}
                                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            as="button"
                                            method="delete"
                                            href={route(
                                                "admin.books.destroy",
                                                book.id
                                            )}
                                            onClick={(e) => {
                                                if(!confirm(`Apakah kamu yakin ingin menghapus buku "${book.title}"?`)) {
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
        </div>
    );
}

Index.layout = (page) => <AdminLayout>{page}</AdminLayout>;
