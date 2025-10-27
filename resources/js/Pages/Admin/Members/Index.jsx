import { Link, usePage } from "@inertiajs/react";
import AdminLayout from "../AdminLayout";

export default function Index({ members }) {
    const { flash } = usePage().props;

    return (
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                        Daftar Member
                    </h1>
                    <p className="text-sm text-gray-500">
                        Kelola data anggota perpustakaan
                    </p>
                </div>

                <Link
                    href={route("admin.members.create")}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                    + Tambah Member
                </Link>
            </div>

            {/* Flash Message */}
            {flash.success && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg shadow-sm text-sm">
                    {flash.success}
                </div>
            )}

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-5 py-3 text-left font-semibold text-gray-600">
                                Nama
                            </th>
                            <th className="px-5 py-3 text-left font-semibold text-gray-600">
                                Email
                            </th>
                            <th className="px-5 py-3 text-left font-semibold text-gray-600">
                                Tanggal Bergabung
                            </th>
                            <th className="px-5 py-3 text-left font-semibold text-gray-600">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.data.length > 0 ? (
                            members.data.map((member) => (
                                <tr
                                    key={member.id}
                                    className="border-b last:border-none hover:bg-gray-50 transition-all"
                                >
                                    <td className="px-5 py-3 font-medium text-gray-900">
                                        {member.name}
                                    </td>
                                    <td className="px-5 py-3">
                                        {member.email}
                                    </td>
                                    <td className="px-5 py-3 text-gray-600">
                                        {new Date(
                                            member.created_at
                                        ).toLocaleDateString("id-ID")}
                                    </td>
                                    <td className="px-5 py-3 space-x-3">
                                        <Link
                                            href={route(
                                                "admin.members.edit",
                                                member.id
                                            )}
                                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                                        >
                                            Edit
                                        </Link>

                                        <Link
                                            as="button"
                                            method="delete"
                                            href={route(
                                                "admin.members.destroy",
                                                member
                                            )}
                                            onClick={(e) => {
                                                if (
                                                    !confirm(
                                                        `Hapus member "${member.name}"?`
                                                    )
                                                )
                                                    e.preventDefault();
                                            }}
                                            className="text-rose-600 hover:text-rose-800 font-medium text-sm"
                                        >
                                            Hapus
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="text-center text-gray-500 py-10 italic"
                                >
                                    Belum ada member.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

Index.layout = (page) => <AdminLayout>{page}</AdminLayout>;
