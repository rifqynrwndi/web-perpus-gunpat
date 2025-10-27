import { Link } from "@inertiajs/react";

export default function NavLink({ href, active, children, ...props }) {
    return (
        <Link
            href={href}
            {...props}
            className={
                "block px-3 py-2 rounded-md text-sm font-medium transition " +
                (active
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100")
            }
        >
            {children}
        </Link>
    );
}
