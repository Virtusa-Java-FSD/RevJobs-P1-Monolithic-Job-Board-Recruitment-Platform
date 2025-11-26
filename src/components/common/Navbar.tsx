// src/components/common/Navbar.tsx
import React, { type JSX } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar(): JSX.Element {
    const activeClass = ({ isActive }: { isActive: boolean }) =>
        isActive ? "nav-link active" : "nav-link";

    return (
        <nav className="navbar">
            <div className="nav-left">
                <div className="brand">RevJobs</div>
            </div>

            <div className="nav-links">
                <NavLink to="/" className={activeClass} end>Home</NavLink>
                <NavLink to="/jobs" className={activeClass}>Jobs</NavLink>
                <NavLink to="/profile" className={activeClass}>Profile</NavLink>
                <NavLink to="/post-job" className={activeClass}>Post Job</NavLink>
                <NavLink to="/applications" className={activeClass}>Applications</NavLink>
                <NavLink to="/scheduler" className={activeClass}>Scheduler</NavLink>
            </div>
        </nav>
    );
}
