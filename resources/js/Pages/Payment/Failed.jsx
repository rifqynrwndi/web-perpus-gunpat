import { Link } from "@inertiajs/react";

export default function Failed() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-6">
            <h1 className="text-3xl font-bold text-rose-700">
                Pembayaran Gagal ❌
            </h1>
            <p className="text-neutral-600 max-w-md">
                Sepertinya terjadi kesalahan saat proses pembayaran. Kamu bisa
                mencoba lagi atau hubungi admin untuk bantuan.
            </p>
            <Link
                href={route("member.borrowings.index")}
                className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition"
            >
                Kembali ke Riwayat Peminjaman
            </Link>
        </div>
    );
}
