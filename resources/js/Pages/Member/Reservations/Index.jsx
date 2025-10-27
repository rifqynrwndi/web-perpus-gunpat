import { Link, usePage } from "@inertiajs/react";
import MemberLayout from "../MemberLayout";

export default function Index({ reservations }) {
    const { flash } = usePage().props;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col space-y-1">
                <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight">
                    Reservasi Buku
                </h1>
                <p className="text-neutral-500 text-sm">
                    Daftar semua buku yang telah kamu reservasi.
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

            {/* Empty State */}
            {reservations.length === 0 ? (
                <div className="text-neutral-500 italic py-10 text-center">
                    Belum ada reservasi aktif.
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-x-auto">
                    <table className="min-w-full text-sm text-neutral-700">
                        <thead className="bg-neutral-50 border-b">
                            <tr>
                                <th className="px-5 py-3 text-left font-semibold">
                                    Judul Buku
                                </th>
                                <th className="px-5 py-3 text-left font-semibold">
                                    Tanggal Reservasi
                                </th>
                                <th className="px-5 py-3 text-left font-semibold">
                                    Status
                                </th>
                                <th className="px-5 py-3 text-left font-semibold">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((r) => (
                                <tr
                                    key={r.id}
                                    className="border-b last:border-none hover:bg-neutral-50 transition-all"
                                >
                                    <td className="px-5 py-3 font-medium text-neutral-900">
                                        {r.book.title}
                                    </td>
                                    <td className="px-5 py-3 text-neutral-500">
                                        {new Date(
                                            r.created_at
                                        ).toLocaleDateString("id-ID")}
                                    </td>
                                    <td className="px-5 py-3">
                                        {r.status === "waiting" ? (
                                            <span className="text-amber-600 font-medium bg-amber-50 px-2 py-1 rounded-full text-xs">
                                                Menunggu
                                            </span>
                                        ) : r.status === "notified" ? (
                                            <span className="text-emerald-700 font-medium bg-emerald-50 px-2 py-1 rounded-full text-xs">
                                                Siap Dipinjam
                                            </span>
                                        ) : r.status === "cancelled" ? (
                                            <span className="text-rose-600 font-medium bg-rose-50 px-2 py-1 rounded-full text-xs">
                                                Dibatalkan
                                            </span>
                                        ) : (
                                            <span className="text-neutral-500 bg-neutral-100 px-2 py-1 rounded-full text-xs font-medium">
                                                Diproses
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-5 py-3">
                                        {["waiting", "notified"].includes(
                                            r.status
                                        ) ? (
                                            <Link
                                                as="button"
                                                method="delete"
                                                href={route(
                                                    "member.reservations.destroy",
                                                    r.id
                                                )}
                                                className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white text-xs font-medium rounded-lg transition active:scale-[0.97]"
                                                onClick={(e) => {
                                                    if (
                                                        !confirm(
                                                            `Batalkan reservasi untuk "${r.book.title}"?`
                                                        )
                                                    )
                                                        e.preventDefault();
                                                }}
                                            >
                                                Batalkan
                                            </Link>
                                        ) : (
                                            <span className="text-neutral-400 text-xs italic">
                                                Tidak dapat dibatalkan
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

Index.layout = (page) => <MemberLayout>{page}</MemberLayout>;
