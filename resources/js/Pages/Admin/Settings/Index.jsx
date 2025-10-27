import { useForm, usePage } from "@inertiajs/react";
import AdminLayout from "../AdminLayout";

export default function Index({ settings }) {
    const { flash } = usePage().props;

    const { data, setData, post, processing } = useForm({
        fine_rate_per_day: settings.fine_rate_per_day || 1000,
        max_borrow_days: settings.max_borrow_days || 7,
        auto_cancel_hours: settings.auto_cancel_hours || 24,
        max_active_borrows_per_member:
            settings.max_active_borrows_per_member || 3,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.settings.update"));
    };

    return (
        <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                        Pengaturan Sistem
                    </h1>
                    <p className="text-sm text-gray-500">
                        Atur batas waktu peminjaman dan tarif denda harian
                    </p>
                </div>
            </div>

            {/* Flash Message */}
            {flash.success && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg shadow-sm text-sm">
                    {flash.success}
                </div>
            )}

            {/* Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Denda per Hari (Rp)
                        </label>
                        <input
                            type="number"
                            value={data.fine_rate_per_day}
                            onChange={(e) =>
                                setData("fine_rate_per_day", e.target.value)
                            }
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Lama Peminjaman Maksimal (hari)
                        </label>
                        <input
                            type="number"
                            value={data.max_borrow_days}
                            onChange={(e) =>
                                setData("max_borrow_days", e.target.value)
                            }
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Auto Cancel (jam)
                        </label>
                        <input
                            type="number"
                            value={data.auto_cancel_hours}
                            onChange={(e) =>
                                setData("auto_cancel_hours", e.target.value)
                            }
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Batas Pinjaman Aktif per Member
                        </label>
                        <input
                            type="number"
                            value={data.max_active_borrows_per_member}
                            onChange={(e) =>
                                setData(
                                    "max_active_borrows_per_member",
                                    e.target.value
                                )
                            }
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                        />
                    </div>

                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
                        >
                            Simpan Perubahan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

Index.layout = (page) => <AdminLayout>{page}</AdminLayout>;
