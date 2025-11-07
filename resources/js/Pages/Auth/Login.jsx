import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), { onFinish: () => reset("password") });
    };

    return (

        <div className="min-h-screen flex flex-col justify-center items-center bg-neutral-50 px-6">
            <Head title="Masuk ke Dashboard" />

            <div className="w-full max-w-md mb-4">
                <Link
                    href="/"
                    className="text-sm font-medium text-red-600 hover:text-red-700"
                >
                    &larr; Kembali ke Beranda
                </Link>
            </div>

            {/* Card */}
            <div className="w-full max-w-md bg-white border border-neutral-200 rounded-2xl shadow-sm p-8 space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight">
                        Masuk ke Perpustakaan Gunungpati
                    </h1>
                    <p className="text-neutral-500 text-sm mt-1">
                        Akses dashboard dan mulai eksplorasi buku
                    </p>
                </div>

                {status && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-2.5 rounded-lg">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-5">
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
                            className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-neutral-900 placeholder-neutral-400 shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                            placeholder="contoh@email.com"
                            autoFocus
                            autoComplete="username"
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
                            className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-neutral-900 placeholder-neutral-400 shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                            placeholder="••••••••"
                            autoComplete="current-password"
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 text-neutral-600">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                                className="w-4 h-4 rounded border-neutral-300 text-red-600 focus:ring-red-500"
                            />
                            Ingat saya
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="text-red-600 hover:text-red-700 font-medium"
                            >
                                Lupa password?
                            </Link>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-lg shadow-sm transition-all active:scale-[0.98]"
                    >
                        Masuk
                    </button>
                </form>

                <p className="text-center text-sm text-neutral-500">
                    Belum punya akun?{" "}
                    <Link
                        href={route("register")}
                        className="text-red-600 hover:text-red-700 font-medium"
                    >
                        Daftar sekarang
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
