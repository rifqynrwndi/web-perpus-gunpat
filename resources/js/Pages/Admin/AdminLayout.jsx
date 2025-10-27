import { Link, usePage } from "@inertiajs/react";
import NavLink from "@/Components/NavLink";

export default function AdminLayout({ children }) {
    const { auth } = usePage().props;
    const current = (name) => route().current(name);

    return (
        <div className="min-h-screen flex bg-gray-50 text-gray-800">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between sticky top-0 h-screen shadow-sm">
                <div className="p-6 space-y-6">
                    {/* Brand */}
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
                            Admin
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Halo, {auth.user.name}
                        </p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-col space-y-1">
                        <NavLink
                            href={route("admin.dashboard")}
                            active={current("admin.dashboard")}
                        >
                            Dashboard
                        </NavLink>
                        <NavLink
                            href={route("admin.books.index")}
                            active={current("admin.books.*")}
                        >
                            Buku
                        </NavLink>
                        <NavLink
                            href={route("admin.categories.index")}
                            active={current("admin.categories.*")}
                        >
                            Kategori
                        </NavLink>
                        <NavLink
                            href={route("admin.members.index")}
                            active={current("admin.members.*")}
                        >
                            Member
                        </NavLink>
                        <NavLink
                            href={route("admin.borrowings.index")}
                            active={current("admin.borrowings.*")}
                        >
                            Peminjaman
                        </NavLink>
                        <NavLink
                            href={route("admin.fines.index")}
                            active={current("admin.fines.*")}
                        >
                            Denda
                        </NavLink>
                        <NavLink
                            href={route("admin.settings.index")}
                            active={current("admin.settings.*")}
                        >
                            Pengaturan
                        </NavLink>
                    </nav>
                </div>

                {/* Logout */}
                <div className="p-6 border-t border-gray-100">
                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all active:scale-[0.98]"
                    >
                        Logout
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-7xl mx-auto">{children}</div>
            </main>
        </div>
    );
}
