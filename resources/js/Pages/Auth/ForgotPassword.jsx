import { Head, useForm } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.email"));
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-neutral-50 px-6">
            <Head title="Lupa Password" />

            <div className="w-full max-w-md bg-white border border-neutral-200 rounded-2xl shadow-sm p-8 space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight">
                        Lupa Password?
                    </h1>
                    <p className="text-neutral-500 text-sm mt-1">
                        Tenang saja, masukkan email kamu dan kami akan
                        mengirimkan tautan untuk mengatur ulang password.
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
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-lg shadow-sm transition-all active:scale-[0.98]"
                    >
                        Kirim Link Reset Password
                    </button>
                </form>

                <p className="text-center text-sm text-neutral-500">
                    Sudah ingat password kamu?{" "}
                    <a
                        href={route("login")}
                        className="text-red-600 hover:text-red-700 font-medium"
                    >
                        Masuk di sini
                    </a>
                </p>
            </div>

            <p className="text-neutral-400 text-xs mt-6">
                © {new Date().getFullYear()} Perpustakaan Gunungpati — Sistem Manajemen
                Perpustakaan
            </p>
        </div>
    );
}
