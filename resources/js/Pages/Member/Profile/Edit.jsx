import { useForm, usePage } from "@inertiajs/react";
import MemberLayout from "../MemberLayout";

export default function Edit({ user }) {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        name: user.name || "",
        email: user.email || "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("member.profile.update"));
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col space-y-1">
                <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight">
                    Edit Profil
                </h1>
                <p className="text-neutral-500 text-sm">
                    Perbarui informasi akun kamu.
                </p>
            </div>

            {/* Flash Message */}
            {flash.success && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg shadow-sm text-sm">
                    {flash.success}
                </div>
            )}

            {/* Form */}
            <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700">
                            Nama
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="mt-1 block w-full rounded-lg border border-neutral-200 focus:border-blue-500 focus:ring-blue-500 p-2.5 text-sm text-neutral-800"
                        />
                        {errors.name && (
                            <p className="text-rose-600 text-sm mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="mt-1 block w-full rounded-lg border border-neutral-200 focus:border-blue-500 focus:ring-blue-500 p-2.5 text-sm text-neutral-800"
                        />
                        {errors.email && (
                            <p className="text-rose-600 text-sm mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-neutral-700">
                                Password Baru
                            </label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className="mt-1 block w-full rounded-lg border border-neutral-200 focus:border-blue-500 focus:ring-blue-500 p-2.5 text-sm"
                                placeholder="Opsional"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700">
                                Konfirmasi Password
                            </label>
                            <input
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                className="mt-1 block w-full rounded-lg border border-neutral-200 focus:border-blue-500 focus:ring-blue-500 p-2.5 text-sm"
                                placeholder="Ulangi password"
                            />
                            {errors.password && (
                                <p className="text-rose-600 text-sm mt-1">
                                    {errors.password}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition active:scale-[0.98]"
                        >
                            Simpan Perubahan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

Edit.layout = (page) => <MemberLayout>{page}</MemberLayout>;
