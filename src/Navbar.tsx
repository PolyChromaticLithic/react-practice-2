import React, { useState, useRef, useEffect, use } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import styles from "./Navbar.module.css";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const content = contentRef.current;
      if (menuOpen) {
        content.style.height = content.scrollHeight + "px";
      } else {
        content.style.height = "4rem";
      }
    }
  }, [menuOpen]);


    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav ref={contentRef} className={styles.navbarWrapper}>
        <nav className={styles.navbar}>
            {/* <Link to="/" className={styles['navbar-logo']}>Astarの素敵なホームページ</Link> */}
            <Link to="/"><img src="./images/icon.jpg" className={styles['navbar-logo']} alt="logo" /></Link>
            <button className={styles['navbar-toggle']} onClick={toggleMenu}>☰</button>
            <ul className={classNames(styles.navbarLinks)}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/works">Works</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </nav>
        <ul
                className={styles.navbarLinksMobile}
                onClick={() => setMenuOpen(false)}
            >
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/works">Works</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;