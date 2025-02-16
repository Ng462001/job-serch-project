import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import '../css/navbar.css'
import Button from '../animatedComponents/Button'

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove("jwt-token")
        navigate("/login")
    }

    return (
        <nav className='w-100 px-5 py-2 navbar top-0 sticky-top '>
            <div className='d-flex justify-content-between align-items-center w-100'>
                <div>
                    <NavLink to="/"><img className="imageLogo" src="/images/logo.png" alt="website logo" /></NavLink>
                </div>
                <div>
                    <ul className='d-flex list-unstyled gap-4 mt-3'>
                        <li>
                            <NavLink to="/" className={({ isActive }) => isActive ? " text-decoration-none fw-bold active" : "text-dark text-decoration-none fw-bold"}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/jobs" className={({ isActive }) => isActive ? "text-decoration-none fw-bold active" : "text-dark text-decoration-none fw-bold"}>Jobs</NavLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <Button onclick={handleLogout} text="Logout" />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
