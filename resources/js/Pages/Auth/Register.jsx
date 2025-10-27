import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("register"), { onFinish: () => reset("password") });
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-neutral-50 px-6">
            <Head title="Daftar Akun" />

            <div className="w-full max-w-md bg-white border border-neutral-200 rounded-2xl shadow-sm p-8 space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight">
                        Buat Akun Baru
                    </h1>
                    <p className="text-neutral-500 text-sm mt-1">
                        Bergabunglah dan nikmati akses penuh ke Perpustakaan Gunungpati
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-neutral-700 mb-1"
                        >
                            Nama Lengkap
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-neutral-900 placeholder-neutral-400 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="Nama kamu"
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-neutral-700 mb-1"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-neutral-900 placeholder-neutral-400 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="contoh@email.com"
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-neutral-700 mb-1"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-neutral-900 placeholder-neutral-400 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="Minimal 8 karakter"
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="password_confirmation"
                            className="block text-sm font-medium text-neutral-700 mb-1"
                        >
                            Konfirmasi Password
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-neutral-900 placeholder-neutral-400 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="Ulangi password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg shadow-sm transition-all active:scale-[0.98]"
                    >
                        Daftar
                    </button>
                </form>

                <p className="text-center text-sm text-neutral-500">
                    Sudah punya akun?{" "}
                    <Link
                        href={route("login")}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                        Masuk
                    </Link>
                </p>
            </div>

            <p className="text-neutral-400 text-xs mt-6">
                © {new Date().getFullYear()} Perpustakaan Gunungpati — Sistem Manajemen
                Perpustakaan
            </p>
        </div>
    );
}
