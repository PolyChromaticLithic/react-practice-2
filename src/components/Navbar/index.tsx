'use client';

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useNotFound } from '../../context/NotFoundContext';
import classNames from "classnames";
import styles from "./styles.module.css";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const { isNotFound } = useNotFound();

    let pathSegments = pathname.split('/').filter(segment => segment);

    if (isNotFound) {
        // if (pathSegments.length > 0) {
        //     if (pathSegments[0] === 'blog') {
        //         if (pathSegments.length > 1 && pathSegments[1] === 'tags') {
        //             pathSegments = ['blog', 'tags', '??'];
        //         } else {
        //             pathSegments = ['blog', '??'];
        //         }
        //     } else if (['about', 'works', 'contact'].includes(pathSegments[0])) {
        //         pathSegments = [pathSegments[0], '??'];
        //     } else {
        //         pathSegments = ['??'];
        //     }
        // } else {
        //     // Handles cases like a 404 on the root, though less common.
        //     pathSegments = ['??'];
        // }
        pathSegments = ['??'];
    }

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
                <div className={styles.logoContainer}>
                    <Link href="/"><img src="/images/icon.jpg" className={styles['navbar-logo']} alt="logo" /></Link>
                    <div className={styles.breadcrumbs}>
                        {pathSegments.length > 0 && <span className={styles.separator}></span>}
                        {pathSegments.map((segment, index) => {
                            const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
                            const displaySegment = segment.charAt(0).toUpperCase() + segment.slice(1);
                            if (segment === '??') {
                                return (
                                    <React.Fragment key={segment}>
                                        <span className={styles.breadcrumbLink}>{displaySegment}</span>
                                        {index < pathSegments.length - 1 && <span className={styles.separator}></span>}
                                    </React.Fragment>
                                );
                            }
                            return (
                                <React.Fragment key={href}>
                                    <Link href={href} className={styles.breadcrumbLink}>{displaySegment}</Link>
                                    {index < pathSegments.length - 1 && <span className={styles.separator}></span>}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
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