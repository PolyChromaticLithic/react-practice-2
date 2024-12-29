import React, { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import styles from "./Navbar.module.css";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles['navbar-logo']}>Astar</div>
            <button className={styles['navbar-toggle']} onClick={toggleMenu}>☰</button>
            <ul
                className={classNames(styles.navbarLinks, {
                    [styles.active]: menuOpen,
                })}
                onClick={() => setMenuOpen(false)}
            >
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;