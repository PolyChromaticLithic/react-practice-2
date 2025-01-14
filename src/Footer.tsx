import React, { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import styles from "./Footer.module.css";

function Footer() {
    return (
        <nav className={styles.footer}>
            <div className={styles.footerText}>
                Astar / PolyChromaticLithic
                <ul className={styles.footerLinks}>
                    <li>Twitter : <a href="https://x.com/PolyChromaticLi">@PolyChromaticLi</a></li>
                    <li>Misskey : <a href="https://misskey.io/@As6">@As6</a></li>
                    <li>GitHub : <a href="https://github.com/PolyChromaticLithic">PolyChromaticLithic</a></li>
                    <li>Mail : <a href="mailto:PolyChromaticLithic@outlook.jp">PolyChromaticLithic@outlook.jp</a></li>
                </ul>
                Copyright © 2024 Astar(PolyChromaticLithic). All rights reserved.
            </div>
        </nav>
    );
}

export default Footer;