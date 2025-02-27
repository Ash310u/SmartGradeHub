import { Link, useLocation } from 'react-router-dom'

const NavLink = ({ to, children }) => {
    const location = useLocation()
    const isActive = location.pathname === to
        ? 'bg-gradient-to-r from-violet-400 to-gray-900 bg-clip-text text-transparent'
        : 'text-gray-600 hover:text-violet-400'

    return (
        <Link
            to={to}
            className={`${isActive} px-4 py-2 rounded-full text-normal font-bold transition-all duration-200 ease-in-out flex items-center space-x-1`}
        >
            <span>{children}</span>
        </Link>
    )
}

export default NavLink;