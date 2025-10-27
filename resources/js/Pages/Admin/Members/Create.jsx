import { useForm } from "@inertiajs/react";
import AdminLayout from "../AdminLayout";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.members.store"));
    };

    return (
        <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                        Tambah Member
                    </h1>
                    <p className="text-sm text-gray-500">
                        Tambahkan member baru ke sistem perpustakaan
                    </p>
                </div>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Nama
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                            placeholder="Nama lengkap member"
                        />
                        {errors.name && (
                            <p className="text-rose-600 text-sm mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Email
                        </label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                            placeholder="contoh@email.com"
                        />
                        {errors.email && (
                            <p className="text-rose-600 text-sm mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Password
                        </label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                            placeholder="Minimal 8 karakter"
                        />
                        {errors.password && (
                            <p className="text-rose-600 text-sm mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
                        >
                            Simpan
                        </button>
                        <a
                            href={route("admin.members.index")}
                            className="px-6 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                        >
                            Batal
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

Create.layout = (page) => <AdminLayout>{page}</AdminLayout>;
