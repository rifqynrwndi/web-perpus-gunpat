import { Link } from "@inertiajs/react";
import AdminLayout from "./AdminLayout";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function Dashboard({ auth, stats, chartData }) {
    const summary = [
        {
            title: "Total Buku",
            value: stats.books,
            color: "bg-blue-50 border-blue-200 text-blue-700",
        },
        {
            title: "Total Member",
            value: stats.members,
            color: "bg-emerald-50 border-emerald-200 text-emerald-700",
        },
        {
            title: "Peminjaman Aktif",
            value: stats.borrowings,
            color: "bg-amber-50 border-amber-200 text-amber-700",
        },
        {
            title: "Total Denda",
            value: `Rp ${Number(stats.fines).toLocaleString("id-ID")}`,
            color: "bg-rose-50 border-rose-200 text-rose-700",
        },
    ];

    const menus = [
        {
            title: "Kelola Buku",
            desc: "Tambah, ubah, dan hapus data buku.",
            href: route("admin.books.index"),
            color: "from-blue-500 to-indigo-500",
        },
        {
            title: "Kelola Kategori",
            desc: "Atur kategori buku agar rapi.",
            href: route("admin.categories.index"),
            color: "from-emerald-500 to-green-500",
        },
        {
            title: "Kelola Member",
            desc: "Manajemen member perpustakaan.",
            href: route("admin.members.index"),
            color: "from-pink-500 to-rose-500",
        },
        {
            title: "Pengaturan Sistem",
            desc: "Ubah konfigurasi sistem & limit.",
            href: route("admin.settings.index"),
            color: "from-amber-500 to-orange-500",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 py-8 space-y-10">
                {/* Header */}
                <header className="space-y-1">
                    <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
                        Selamat Datang, {auth.user.name}
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Anda masuk sebagai{" "}
                        <span className="font-medium text-blue-600">
                            {auth.user.role}
                        </span>
                    </p>
                </header>

                {/* Statistik Cards */}
                <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {summary.map((item, i) => (
                        <div
                            key={i}
                            className={`p-6 rounded-xl border ${item.color} shadow-sm hover:shadow-md transition-all`}
                        >
                            <h3 className="text-sm font-medium text-gray-600 mb-2 tracking-tight">
                                {item.title}
                            </h3>
                            <p className="text-3xl font-semibold">
                                {item.value}
                            </p>
                        </div>
                    ))}
                </section>

                {/* Grafik Aktivitas Bulanan */}
                <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                        Aktivitas Peminjaman per Bulan
                    </h2>

                    {chartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#e5e7eb"
                                />
                                <XAxis
                                    dataKey="month"
                                    tick={{ fontSize: 12 }}
                                />
                                <YAxis allowDecimals={false} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "white",
                                        borderRadius: "8px",
                                        border: "1px solid #e5e7eb",
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="total"
                                    stroke="#2563eb"
                                    strokeWidth={3}
                                    dot={{ r: 4 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                            <div className="text-5xl mb-3">📊</div>
                            <p className="text-sm">
                                Belum ada data peminjaman untuk ditampilkan.
                            </p>
                        </div>
                    )}
                </section>

                {/* Navigation Cards */}
                <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menus.map((item, i) => (
                        <Link
                            key={i}
                            href={item.href}
                            className={`block bg-gradient-to-br ${item.color} text-white p-6 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-200`}
                        >
                            <h2 className="text-lg font-semibold mb-1 tracking-tight">
                                {item.title}
                            </h2>
                            <p className="text-sm opacity-90 leading-relaxed">
                                {item.desc}
                            </p>
                        </Link>
                    ))}
                </section>
            </div>
        </div>
    );
}

Dashboard.layout = (page) => <AdminLayout>{page}</AdminLayout>;
    