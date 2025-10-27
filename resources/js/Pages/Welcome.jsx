import { Link } from "@inertiajs/react";

export default function Welcome({ canLogin, canRegister }) {
    return (
        <div className="min-h-screen bg-neutral-50 text-neutral-800 flex flex-col">
            {/* Navbar */}
            <header className="w-full border-b border-neutral-200 bg-white/70 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <h1 className="text-lg font-semibold tracking-tight">
                        Perpustakaan Kelurahan Gunungpati
                        <span className="text-blue-600"></span>
                    </h1>
                    <nav className="hidden sm:flex gap-4 text-sm font-medium text-neutral-600">
                        <a
                            href="#features"
                            className="hover:text-blue-600 transition"
                        >
                            Fitur
                        </a>
                        <a
                            href="#about"
                            className="hover:text-blue-600 transition"
                        >
                            Tentang
                        </a>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16 sm:py-24">
                <div className="max-w-3xl space-y-6">
                    <h2 className="text-4xl sm:text-5xl font-semibold text-neutral-900 tracking-tight leading-tight">
                        Kelola Perpustakaan dengan Mudah & Terorganisir
                    </h2>
                    <p className="text-neutral-500 text-base sm:text-lg max-w-2xl mx-auto">
                        <span className="font-medium text-blue-600">
                            Perpustakaan Kelurahan Gunungpati
                        </span>{" "}
                        adalah sistem manajemen perpustakaan digital kelurahan
                        Gunungpati berbasis web yang membantu pengelolaan buku,
                        peminjaman, dan reservasi secara efisien baik untuk
                        admin maupun anggota.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                        {canLogin && (
                            <Link
                                href={route("login")}
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition active:scale-[0.98] shadow-sm hover:shadow-md"
                            >
                                Masuk ke Sistem
                            </Link>
                        )}
                        {canRegister && (
                            <Link
                                href={route("register")}
                                className="px-6 py-3 border border-neutral-300 hover:bg-neutral-100 rounded-lg text-sm font-medium transition active:scale-[0.98]"
                            >
                                Daftar Anggota
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section
                id="features"
                className="bg-white border-t border-neutral-200 py-20"
            >
                <div className="max-w-6xl mx-auto px-6 text-center space-y-12">
                    <h3 className="text-2xl font-semibold text-neutral-900 tracking-tight">
                        Fitur Utama
                    </h3>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Manajemen Buku",
                                desc: "Tambah, ubah, dan kelola koleksi buku dengan kategori yang rapi dan mudah diakses.",
                            },
                            {
                                title: "Peminjaman & Pengembalian",
                                desc: "Pantau aktivitas peminjaman dan kembalikan buku secara digital tanpa ribet.",
                            },
                            {
                                title: "Reservasi Buku",
                                desc: "Pesan buku yang sedang dipinjam orang lain agar kamu jadi prioritas berikutnya.",
                            },
                            {
                                title: "Riwayat & Denda",
                                desc: "Cek histori peminjaman dan denda dengan transparansi penuh.",
                            },
                            {
                                title: "Dashboard Admin & Member",
                                desc: "Tampilan dan fitur yang disesuaikan untuk peran masing-masing pengguna.",
                            },
                            {
                                title: "Akses Multi-Perangkat",
                                desc: "Bisa diakses dari laptop, tablet, atau ponsel dengan tampilan adaptif dan ringan.",
                            },
                        ].map((f, i) => (
                            <div
                                key={i}
                                className="bg-neutral-50 border border-neutral-200 p-6 rounded-xl text-left shadow-sm hover:shadow-md transition-all duration-200"
                            >
                                <h4 className="font-semibold text-neutral-900 mb-2">
                                    {f.title}
                                </h4>
                                <p className="text-sm text-neutral-600 leading-relaxed">
                                    {f.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section
                id="about"
                className="py-20 bg-neutral-50 border-t border-neutral-200"
            >
                <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
                    <h3 className="text-2xl font-semibold text-neutral-900 tracking-tight">
                        Tentang Perpustakaan Kelurahan Gunungpati
                    </h3>
                    <p className="text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                        Perpustakaan Kelurahan Gunungpati dikembangkan sebagai
                        sistem manajemen perpustakaan modern untuk mendukung
                        kegiatan akademik di lingkungan kampus dan instansi.
                        Dengan pendekatan{" "}
                        <span className="text-blue-600 font-medium">
                            Notion-style minimalis
                        </span>
                        , Perpustakaan Kelurahan Gunungpati fokus pada kemudahan
                        navigasi, kejelasan informasi, dan efisiensi penggunaan —
                        tanpa kehilangan keindahan visualnya.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer
                className="border-t border-neutral-200 bg-white text-neutral-500 text-sm"
            >
                <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-center justify-between items-center">
                    <p>
                        © {new Date().getFullYear()} Perpustakaan Kelurahan
                        Gunungpati — Sistem Manajemen Perpustakaan Digital
                    </p>
                </div>
            </footer>
        </div>
    );
}
