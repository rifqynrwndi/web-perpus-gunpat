import { Link } from "@inertiajs/react";

export default function Success() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-6">
            <h1 className="text-3xl font-bold text-emerald-700">
                Pembayaran Berhasil 🎉
            </h1>
            <p className="text-neutral-600 max-w-md">
                Terima kasih! Pembayaran denda kamu sudah kami terima. Kamu bisa
                kembali ke halaman peminjaman untuk melihat status terbaru.
            </p>
            <Link
                href={route("member.borrowings.index")}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
            >
                Kembali ke Riwayat Peminjaman
            </Link>
        </div>
    );
}
