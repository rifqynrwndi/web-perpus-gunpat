import { Link, usePage } from "@inertiajs/react";
import MemberLayout from "../MemberLayout";
import axios from "axios";

export default function Index({ borrowings }) {
    const { flash } = usePage().props;

    const statusBadge = (status) => {
        const map = {
            requested: "bg-amber-50 text-amber-700",
            borrowed: "bg-blue-50 text-blue-700",
            returned: "bg-emerald-50 text-emerald-700",
            cancelled: "bg-rose-50 text-rose-700",
        };
        return (
            <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    map[status] || "bg-neutral-100 text-neutral-600"
                }`}
            >
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const handlePayment = async (borrowingId) => {
        try {
            const response = await axios.post(
                route("member.payments.pay", borrowingId)
            );

            if (response.data && response.data.redirect_url) {
                window.location.href = response.data.redirect_url;
            } else {
                alert("URL pembayaran tidak ditemukan di respons server.");
            }
        } catch (error) {
            console.error(
                "Gagal membuat invoice Xendit:",
                error.response || error
            );
            alert("Gagal memproses pembayaran. Silakan coba lagi.");
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col space-y-1">
                <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight">
                    Riwayat Peminjaman
                </h1>
                <p className="text-neutral-500 text-sm">
                    Semua aktivitas peminjaman buku kamu, termasuk denda dan
                    status pembayaran.
                </p>
            </div>

            {/* Flash Success/Error */}
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

            {/* VA Info (Xendit) */}
            {flash.va && (
                <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-4 rounded-lg shadow-sm text-sm space-y-1">
                    <p className="font-semibold mb-1">
                        Detail Virtual Account:
                    </p>
                    <p>
                        <strong>Bank:</strong> {flash.va.bank}
                    </p>
                    <p>
                        <strong>No VA:</strong> {flash.va.account_number}
                    </p>
                    <p>
                        <strong>Jumlah:</strong> Rp{" "}
                        {Number(flash.va.amount).toLocaleString("id-ID")}
                    </p>
                    {flash.va.expiry_date && (
                        <p>
                            <strong>Berlaku hingga:</strong>{" "}
                            {new Date(flash.va.expiry_date).toLocaleString(
                                "id-ID"
                            )}
                        </p>
                    )}
                    <p className="text-xs italic mt-1">
                        Silakan transfer sesuai nominal agar pembayaran otomatis
                        terverifikasi.
                    </p>
                </div>
            )}

            {/* Table */}
            <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-x-auto">
                <table className="min-w-full text-sm text-neutral-700">
                    <thead className="bg-neutral-50 border-b">
                        <tr>
                            <th className="px-5 py-3 text-left font-semibold">
                                Judul Buku
                            </th>
                            <th className="px-5 py-3 text-left font-semibold">
                                Tanggal Pinjam
                            </th>
                            <th className="px-5 py-3 text-left font-semibold">
                                Jatuh Tempo
                            </th>
                            <th className="px-5 py-3 text-left font-semibold">
                                Tanggal Kembali
                            </th>
                            <th className="px-5 py-3 text-left font-semibold">
                                Status
                            </th>
                            <th className="px-5 py-3 text-left font-semibold">
                                Denda
                            </th>
                            <th className="px-5 py-3 text-left font-semibold">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {borrowings.data.length > 0 ? (
                            borrowings.data.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-b last:border-none hover:bg-neutral-50 transition-all"
                                >
                                    <td className="px-5 py-3 font-medium text-neutral-900">
                                        {item.book?.title || "—"}
                                    </td>
                                    <td className="px-5 py-3 text-neutral-500">
                                        {item.borrow_date
                                            ? new Date(
                                                  item.borrow_date
                                              ).toLocaleDateString("id-ID")
                                            : "—"}
                                    </td>
                                    <td className="px-5 py-3 text-neutral-500">
                                        {item.due_date
                                            ? new Date(
                                                  item.due_date
                                              ).toLocaleDateString("id-ID")
                                            : "—"}
                                    </td>
                                    <td className="px-5 py-3 text-neutral-500">
                                        {item.return_date
                                            ? new Date(
                                                  item.return_date
                                              ).toLocaleDateString("id-ID")
                                            : "—"}
                                    </td>
                                    <td className="px-5 py-3">
                                        {statusBadge(item.status)}
                                    </td>

                                    {/* Denda */}
                                    <td className="px-5 py-3">
                                        {item.fine_amount > 0 ? (
                                            <div className="flex flex-col space-y-1">
                                                <span className="text-rose-600 font-semibold">
                                                    Rp{" "}
                                                    {item.fine_amount.toLocaleString(
                                                        "id-ID"
                                                    )}
                                                </span>
                                                <span
                                                    className={`text-xs font-medium ${
                                                        item.is_fine_paid
                                                            ? "text-emerald-600"
                                                            : "text-rose-600"
                                                    }`}
                                                >
                                                    {item.is_fine_paid
                                                        ? "Sudah dibayar"
                                                        : "Belum dibayar"}
                                                </span>

                                                {/* Tombol Bayar Denda */}
                                                {!item.is_fine_paid &&
                                                    item.status ===
                                                        "returned" && (
                                                        <button
                                                            onClick={() =>
                                                                handlePayment(
                                                                    item.id
                                                                )
                                                            }
                                                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-md mt-1 transition active:scale-[0.98]"
                                                        >
                                                            Bayar Denda
                                                        </button>
                                                    )}
                                            </div>
                                        ) : (
                                            <span className="text-neutral-400 text-sm">
                                                Tidak ada denda
                                            </span>
                                        )}
                                    </td>

                                    {/* Aksi Umum */}
                                    <td className="px-5 py-3">
                                        {item.status === "requested" ? (
                                            <Link
                                                as="button"
                                                method="delete"
                                                href={route(
                                                    "member.borrowings.cancel",
                                                    item.id
                                                )}
                                                onClick={(e) => {
                                                    if (
                                                        !confirm(
                                                            `Batalkan permintaan peminjaman untuk "${item.book.title}"?`
                                                        )
                                                    )
                                                        e.preventDefault();
                                                }}
                                                className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white text-xs font-medium rounded-lg transition active:scale-[0.97]"
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
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="text-center py-10 text-neutral-500 italic"
                                >
                                    Tidak ada riwayat peminjaman.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {borrowings.links && borrowings.links.length > 1 && (
                <div className="flex justify-center gap-2 pt-4">
                    {borrowings.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url || "#"}
                            className={`px-3 py-1.5 rounded text-sm transition ${
                                link.active
                                    ? "bg-blue-600 text-white"
                                    : "bg-neutral-200 hover:bg-neutral-300 text-neutral-700"
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

Index.layout = (page) => <MemberLayout>{page}</MemberLayout>;
