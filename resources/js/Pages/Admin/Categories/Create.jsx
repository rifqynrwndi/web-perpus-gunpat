import { useForm } from "@inertiajs/react";
import AdminLayout from "../AdminLayout";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.categories.store"));
    };

    return (
        <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                        Tambah Kategori
                    </h1>
                    <p className="text-sm text-gray-500">
                        Tambahkan kategori baru untuk mengelompokkan buku
                    </p>
                </div>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Nama Kategori
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all"
                            placeholder="Contoh: Teknologi, Sains, Novel..."
                        />
                        {errors.name && (
                            <p className="text-rose-600 text-sm mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Deskripsi
                        </label>
                        <textarea
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all"
                            placeholder="Tuliskan deskripsi singkat kategori ini..."
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
                        >
                            Simpan
                        </button>
                        <a
                            href={route("admin.categories.index")}
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
