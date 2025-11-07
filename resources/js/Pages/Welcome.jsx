import { Link } from "@inertiajs/react";

export default function Welcome({ canLogin, canRegister }) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-red-100 text-neutral-800 flex flex-col font-sans">
            {/* Navbar */}
            <header className="w-full bg-gradient-to-r from-red-700 to-red-500 text-white shadow-md sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <h1 className="text-lg sm:text-xl font-semibold tracking-tight">
                        Perpustakaan Kelurahan Gunungpati
                    </h1>
                    <nav className="hidden sm:flex gap-5 text-sm font-medium">
                        <a href="#howto" className="hover:text-red-200 transition">Cara Peminjaman</a>
                        <a href="#features" className="hover:text-red-200 transition">Fitur</a>
                        <a href="#news" className="hover:text-red-200 transition">Berita</a>
                        <a href="#contact" className="hover:text-red-200 transition">Kontak</a>
                        {canLogin && (
                            <Link href={route("login")} className="hover:text-red-200 transition">Login</Link>
                        )}
                        {canRegister && (
                            <Link href={route("register")} className="hover:text-red-200 transition">Daftar</Link>
                        )}
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 sm:py-28 bg-[url('https://gunungpati.semarangkota.go.id/assets/front/images/bg_hero.png')] bg-cover bg-center relative">
                <div className="absolute inset-0 bg-red-800/40"></div>
                <div className="relative max-w-3xl text-white space-y-6">
                    <h2 className="text-4xl sm:text-5xl font-bold drop-shadow-md">
                        Selamat Datang di <br />
                        <span className="text-red-700">Perpustakaan Kelurahan Gunungpati</span>
                    </h2>
                    <p className="text-base sm:text-lg leading-relaxed drop-shadow-sm">
                        Sistem manajemen perpustakaan digital untuk warga Gunungpati — mendukung literasi dan kemudahan akses buku di era modern.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        {canLogin && (
                            <Link
                                href={route("login")}
                                className="px-6 py-3 bg-red-600 hover:bg-red-800 text-white font-semibold rounded-lg shadow transition active:scale-95"
                            >
                                Masuk ke Sistem
                            </Link>
                        )}
                        {canRegister && (
                            <Link
                                href={route("register")}
                                className="px-6 py-3 bg-white/80 hover:bg-white text-red-800 font-semibold rounded-lg shadow transition active:scale-95"
                            >
                                Daftar Anggota
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            {/* How to Borrow Section */}
            <section id="howto" className="py-20 bg-gradient-to-b from-white to-red-50 border-t border-red-100">
                <div className="max-w-5xl mx-auto px-6 text-center space-y-10">
                    <h3 className="text-3xl font-bold text-red-800 tracking-tight">
                        Cara Meminjam Buku
                    </h3>
                    <div className="grid sm:grid-cols-3 gap-8 text-left">
                        {[
                            { step: "1", title: "Login ke Akun", desc: "Masuk ke akun anggota menggunakan email dan password Anda." },
                            { step: "2", title: "Pilih Buku", desc: "Telusuri koleksi buku dan klik tombol 'Pinjam' pada buku yang diinginkan." },
                            { step: "3", title: "Tunggu Konfirmasi", desc: "Admin akan memverifikasi permintaan peminjaman Anda, lalu buku siap diambil." },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="bg-white border border-red-100 rounded-xl shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200 text-center"
                            >
                                <div className="text-red-600 text-4xl font-bold mb-3">{item.step}</div>
                                <h4 className="text-lg font-semibold mb-2 text-red-800">{item.title}</h4>
                                <p className="text-sm text-neutral-700 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="bg-white py-20 border-t border-red-100">
                <div className="max-w-6xl mx-auto px-6 text-center space-y-12">
                    <h3 className="text-3xl font-bold text-red-800 tracking-tight">
                        Fitur Utama Perpustakaan
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "Manajemen Buku", desc: "Kelola koleksi buku dengan kategori rapi dan mudah diakses." },
                            { title: "Peminjaman & Pengembalian", desc: "Pantau aktivitas peminjaman dan pengembalian buku secara online." },
                            { title: "Reservasi Buku", desc: "Pesan buku yang sedang dipinjam agar kamu mendapat giliran berikutnya." },
                            { title: "Riwayat & Denda", desc: "Lihat histori peminjaman dan denda dengan sistem otomatis." },
                            { title: "Dashboard Admin & Member", desc: "Fitur berbeda sesuai peran pengguna, praktis dan efisien." },
                            { title: "Akses Multi-Perangkat", desc: "Dapat diakses dari komputer, tablet, maupun ponsel." },
                        ].map((f, i) => (
                            <div
                                key={i}
                                className="bg-gradient-to-b from-red-50 to-white border border-red-100 p-6 rounded-xl text-left shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                            >
                                <h4 className="font-semibold text-red-800 mb-2">{f.title}</h4>
                                <p className="text-sm text-neutral-700 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* News Section */}
            <section id="news" className="py-20 bg-white border-t border-red-100">
                <div className="max-w-6xl mx-auto px-6 text-center space-y-10">
                    <h3 className="text-3xl font-bold text-red-800 tracking-tight">
                        Berita & Informasi Terbaru
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Koleksi Buku Baru 2025",
                                date: "November 2025",
                                desc: "Kini tersedia buku-buku literasi digital dan novel populer terbaru di perpustakaan.",
                                img: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
                            },
                            {
                                title: "Update Sistem Reservasi Buku",
                                date: "Oktober 2025",
                                desc: "Sistem reservasi kini lebih cepat dengan notifikasi langsung ke akun Anda.",
                                img: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
                            },
                            {
                                title: "Gerakan Membaca Bersama",
                                date: "September 2025",
                                desc: "Ayo ikut program membaca bersama warga setiap minggu di aula kelurahan.",
                                img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
                            },
                        ].map((news, i) => (
                            <div
                                key={i}
                                className="bg-white border border-red-100 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
                            >
                                <img src={news.img} alt={news.title} className="w-full h-40 object-cover" />
                                <div className="p-5 text-left">
                                    <h4 className="text-lg font-semibold text-red-800 mb-1">{news.title}</h4>
                                    <p className="text-xs text-neutral-500 mb-2">{news.date}</p>
                                    <p className="text-sm text-neutral-700 leading-relaxed">{news.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact & Map Section */}
            <section id="contact" className="py-20 bg-gradient-to-b from-red-50 to-white border-t border-red-100">
                <div className="max-w-6xl mx-auto px-6 text-center space-y-10">
                    <h3 className="text-3xl font-bold text-red-800 tracking-tight">Kontak & Lokasi</h3>
                    <p className="text-neutral-700 max-w-2xl mx-auto">
                        Untuk pertanyaan atau bantuan, silakan hubungi kami melalui kontak berikut.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-10 text-left">
                        <div className="space-y-4">
                            <p><strong>📍 Alamat:</strong> Jl. Magersari, Gunungpati, Kec. Gn. Pati, Kota Semarang, Jawa Tengah 50229</p>
                            <p><strong>☎️ Telepon:</strong> (024) 76922082</p>
                            <p><strong>📧 Email:</strong> kelurahan.gunungpati@semarangkota.go.id</p>
                            <p><strong>🕓 Jam Layanan:</strong> Senin - Jumat, 08.00 - 15.00 WIB</p>
                        </div>

                        <iframe
                            title="Lokasi Kelurahan Gunungpati"
                            src="https://maps.google.com/maps?width=600&height=400&hl=en&q=Kantor%20Kelurahan%20Gunungpati&t=h&z=15&ie=UTF8&iwloc=B&output=embed"
                            allowFullScreen
                            loading="lazy"
                            className="w-full h-64 rounded-lg shadow-md border border-red-100"
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-red-800 text-white border-t border-red-700 text-sm">
                <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p>
                        © {new Date().getFullYear()} Perpustakaan Kelurahan Gunungpati — Kota Semarang
                    </p>
                    <a
                        href="https://gunungpati.semarangkota.go.id/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white-300 hover:text-white-400 font-medium transition"
                    >
                        gunungpati.semarangkota.go.id
                    </a>
                </div>
            </footer>
        </div>
    );
}
