import { Link, usePage } from "@inertiajs/react";
import AdminLayout from "../AdminLayout";

export default function Index({ borrowings }) {
    const { flash } = usePage().props;

    return (
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                        Manajemen Peminjaman
                    </h1>
                    <p className="text-sm text-gray-500">
                        Kelola peminjaman dan pengembalian buku
                    </p>
                </div>
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
                                Member
                            </th>
                            <th className="px-5 py-3 text-left font-semibold text-gray-600">
                                Buku
                            </th>
                            <th className="px-5 py-3 text-left font-semibold text-gray-600">
                                Status
                            </th>
                            <th className="px-5 py-3 text-left font-semibold text-gray-600">
                                Tanggal Pinjam
                            </th>
                            <th className="px-5 py-3 text-left font-semibold text-gray-600">
                                Jatuh Tempo
                            </th>
                            <th className="px-5 py-3 text-left font-semibold text-gray-600">
                                Aksi
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {borrowings.length > 0 ? (
                            borrowings.map((b) => (
                                <tr
                                    key={b.id}
                                    className="border-b last:border-none hover:bg-gray-50 transition-all"
                                >
                                    <td className="px-5 py-3 font-medium text-gray-900">
                                        {b.user.name}
                                    </td>
                                    <td className="px-5 py-3">
                                        {b.book.title}
                                    </td>
                                    <td className="px-5 py-3 capitalize">
                                        <span
                                            className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                                                b.status === "borrowed"
                                                    ? "bg-blue-50 border-blue-200 text-blue-700"
                                                    : b.status === "requested"
                                                    ? "bg-amber-50 border-amber-200 text-amber-700"
                                                    : "bg-emerald-50 border-emerald-200 text-emerald-700"
                                            }`}
                                        >
                                            {b.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3 text-gray-600">
                                        {b.borrow_date ?? "-"}
                                    </td>
                                    <td className="px-5 py-3 text-gray-600">
                                        {b.due_date ?? "-"}
                                    </td>
                                    <td className="px-5 py-3 space-x-2">
                                        {b.status === "requested" && (
                                            <Link
                                                method="patch"
                                                as="button"
                                                href={route(
                                                    "admin.borrowings.update",
                                                    b.id
                                                )}
                                                data={{ action: "approve" }}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-all shadow-sm hover:shadow-md"
                                            >
                                                Approve
                                            </Link>
                                        )}
                                        {b.status === "borrowed" && (
                                            <Link
                                                method="patch"
                                                as="button"
                                                href={route(
                                                    "admin.borrowings.update",
                                                    b.id
                                                )}
                                                data={{ action: "return" }}
                                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-all shadow-sm hover:shadow-md"
                                            >
                                                Return
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="text-center text-gray-500 py-10 italic"
                                >
                                    Belum ada data peminjaman.
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
