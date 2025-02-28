import { Link } from "react-router-dom"
import NavLink from "./features/NavLink"
import { useSelector } from "react-redux"

const Navbar = () => {
    const token = useSelector(state => state.auth.token)

    const navLinks = [
        { path: '/dashboard', label: "Dashboard" },
    ]

    const content = navLinks.map((link) => {
        if (!token) {
            return null
        }
        return (
            <NavLink key={link.path} to={link.path}>
                {link.label}
            </NavLink>
        )
    })

    return (
        <div className="bg-white/10 backdrop-blur-md shadow-lg flex justify-between items-center py-6 px-10 w-full top-0 z-50">
            <div>
                <Link to="/" className="flex items-center font-bold text-xl transition-all duration-300 hover:scale-105">
                        <span className="bg-gradient-to-r from-violet-400 to-gray-900 bg-clip-text text-transparent">
                            SmartGradeHub
                        </span>
                </Link>
            </div>
            <div className="flex justify-between gap-6">
                {content}
            </div>
        </div>
    )
}

export default Navbar;