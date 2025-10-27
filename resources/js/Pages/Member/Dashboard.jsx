import { Link } from "@inertiajs/react";
import MemberLayout from "./MemberLayout";

export default function Dashboard({ auth }) {
    const quickLinks = [
        {
            title: "Edit Profil",
            desc: "Ubah nama, email, atau password akun kamu.",
            href: route("member.profile.edit"),
        },
        {
            title: "Katalog Buku",
            desc: "Lihat dan cari buku yang tersedia untuk dipinjam.",
            href: route("member.books.index"),
        },
        {
            title: "Riwayat Peminjaman",
            desc: "Lihat daftar buku yang sudah dan sedang kamu pinjam.",
            href: route("member.borrowings.index"),
        },
        {
            title: "Reservasi Saya",
            desc: "Cek daftar buku yang kamu pesan dan tunggu ketersediaannya.",
            href: route("member.reservations.index"),
        },
    ];

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col space-y-1">
                <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight">
                    Halo, {auth.user.name}
                </h1>
                <p className="text-neutral-500 text-sm">
                    Selamat datang di dashboard member Perpustakaan.
                </p>
            </div>

            {/* Quick Navigation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {quickLinks.map((link, i) => (
                    <Link
                        key={i}
                        href={link.href}
                        className="group block bg-white border border-neutral-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all hover:border-neutral-300"
                    >
                        <h2 className="text-base font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors">
                            {link.title}
                        </h2>
                        <p className="text-neutral-500 text-sm mt-1 leading-relaxed">
                            {link.desc}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

Dashboard.layout = (page) => <MemberLayout>{page}</MemberLayout>;
