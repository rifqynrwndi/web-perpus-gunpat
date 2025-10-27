import { useForm } from "@inertiajs/react";
import AdminLayout from "../AdminLayout";

export default function Create({ categories }) {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        author: "",
        isbn: "",
        category_id: "",
        total_copies: 1,
        available_copies: "",
        description: "",
    });

    const submit = (e) => {
        e.preventDefault();

        if (parseInt(data.available_copies) > parseInt(data.total_copies)) {
            alert(
                "Jumlah tersedia tidak boleh lebih besar dari total eksemplar!"
            );
            return;
        }

        post(route("admin.books.store"));
    };

    return (
        <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                        Tambah Buku
                    </h1>
                    <p className="text-sm text-gray-500">
                        Isi detail buku baru di bawah ini
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <form onSubmit={submit} className="space-y-5">
                    {/* Input Group */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Judul Buku
                        </label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all"
                        />
                        {errors.title && (
                            <p className="text-rose-600 text-sm mt-1">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Penulis
                            </label>
                            <input
                                type="text"
                                value={data.author}
                                onChange={(e) =>
                                    setData("author", e.target.value)
                                }
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Kategori
                            </label>
                            <select
                                value={data.category_id}
                                onChange={(e) =>
                                    setData("category_id", e.target.value)
                                }
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                            >
                                <option value="">Pilih kategori...</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Total Eksemplar
                            </label>
                            <input
                                type="number"
                                value={data.total_copies}
                                onChange={(e) =>
                                    setData("total_copies", e.target.value)
                                }
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Tersedia
                            </label>
                            <input
                                type="number"
                                value={data.available_copies}
                                onChange={(e) =>
                                    setData("available_copies", e.target.value)
                                }
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
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
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            File E-book (PDF)
                        </label>
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => setData("file", e.target.files[0])}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-gray-100 hover:file:bg-gray-200 transition-all"
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
                            href={route("admin.books.index")}
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
