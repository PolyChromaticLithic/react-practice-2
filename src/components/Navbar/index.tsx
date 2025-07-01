'use client';

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import classNames from "classnames";
import styles from "./styles.module.css";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            const content = contentRef.current;
            if (menuOpen) {
                content.style.height = 'auto';
                const height = content.scrollHeight;
                content.style.height = '4rem';
                requestAnimationFrame(() => {
                    content.style.height = `${height}px`;
                });
            } else {
                content.style.height = '4rem';
            }
        }
    }, [menuOpen]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav ref={contentRef} className={classNames(styles.navbarWrapper, { [styles.open]: menuOpen })}>
            <nav className={styles.navbar}>
                <Link href="/"><img src="/images/icon.jpg" className={styles['navbar-logo']} alt="logo" /></Link>
                <button className={styles['navbar-toggle']} onClick={toggleMenu}>☰</button>
                <ul className={styles.navbarLinks}>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/works">Works</Link></li>
                    <li><Link href="/blog">Blog</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                </ul>
            </nav>
            <ul
                className={classNames(styles.navbarLinksMobile, {
                    [styles.open]: menuOpen
                })}
                onClick={() => setMenuOpen(false)}
            >
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/works">Works</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/contact">Contact</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar; 