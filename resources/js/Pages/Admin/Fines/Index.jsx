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
                        Manajemen Denda
                    </h1>
                    <p className="text-sm text-gray-500">
                        Lihat dan kelola pembayaran denda keterlambatan
                    </p>
                </div>
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

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-5 py-3 text-left font-semibold text-gray-600">
                                Member
                            </th>
                            <th className="px-5 py-3 text-left font-semibold text-gray-600">
                                Judul Buku
                            </th>
                            <th className="px-5 py-3 text-left font-semibold text-gray-600">
                                Denda
                            </th>
                            <th className="px-5 py-3 text-left font-semibold text-gray-600">
                                Status
                            </th>
                            <th className="px-5 py-3 text-left font-semibold text-gray-600">
                                Tanggal Pembayaran
                            </th>
                            <th className="px-5 py-3 text-center font-semibold text-gray-600">
                                Aksi
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {borrowings.data.length > 0 ? (
                            borrowings.data.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-b last:border-none hover:bg-gray-50 transition-all"
                                >
                                    <td className="px-5 py-3 font-medium text-gray-900">
                                        {item.user?.name || "—"}
                                    </td>
                                    <td className="px-5 py-3">
                                        {item.book?.title || "—"}
                                    </td>
                                    <td className="px-5 py-3 font-semibold text-rose-600">
                                        Rp{" "}
                                        {item.fine_amount.toLocaleString(
                                            "id-ID"
                                        )}
                                    </td>
                                    <td className="px-5 py-3">
                                        {item.is_fine_paid ? (
                                            <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-medium">
                                                Sudah Dibayar
                                            </span>
                                        ) : (
                                            <span className="bg-rose-50 border border-rose-200 text-rose-700 px-2.5 py-1 rounded-full text-xs font-medium">
                                                Belum Dibayar
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-5 py-3 text-gray-500 text-sm">
                                        {item.fine_paid_at
                                            ? new Date(
                                                  item.fine_paid_at
                                              ).toLocaleDateString("id-ID", {
                                                  day: "2-digit",
                                                  month: "short",
                                                  year: "numeric",
                                              })
                                            : "—"}
                                    </td>
                                    <td className="px-5 py-3 text-center">
                                        {!item.is_fine_paid && (
                                            <Link
                                                href={route(
                                                    "admin.fines.markPaid",
                                                    item.id
                                                )}
                                                method="post"
                                                as="button"
                                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
                                            >
                                                Tandai Sudah Dibayar
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
                                    Tidak ada denda ditemukan.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {borrowings.links && borrowings.links.length > 1 && (
                <div className="flex justify-center items-center gap-2 pt-4">
                    {borrowings.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url || "#"}
                            className={`min-w-[2.5rem] px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                link.active
                                    ? "bg-blue-600 text-white shadow-sm"
                                    : link.url
                                    ? "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

Index.layout = (page) => <AdminLayout>{page}</AdminLayout>;
