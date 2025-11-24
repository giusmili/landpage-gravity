"use client";

import React, { useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileExiting, setMobileExiting] = useState(false);
    const closeMobile = () => {
        if (!mobileOpen) return;
        setMobileExiting(true);
        // Match CSS exit animation duration
        setTimeout(() => {
            setMobileOpen(false);
            setMobileExiting(false);
        }, 220);
    };
    return (
        <>
        <header className="site-header">
            <Link className="site-brand" href="/">
        
                <span className="site-title">
                    Gravity
                </span>
            </Link>
            <nav className="site-nav">
                <Link href="/">
                    Product
                </Link>
                <Link className="inline-icon" href="/">
                    Use Cases
                    <span className="material-icons-outlined" aria-hidden="true">expand_more</span>
                </Link>
                <Link href="/">
                    Pricing
                </Link>
                <Link href="/">
                    Blog
                </Link>
                <Link className="inline-icon" href="/">
                    Resources
                    <span className="material-icons-outlined" aria-hidden="true">expand_more</span>
                </Link>
            </nav>
            <div className="header-actions">
                <Link className="btn btn-primary text-sm" href="/">
                    Download
                    <span className="material-icons-outlined">download</span>
                </Link>
                <ThemeToggle />
                <button
                  type="button"
                  aria-label={mobileOpen ? "Close menu" : "Open menu"}
                  className="menu-button menu-button--mobile"
                  onClick={() => {
                    if (mobileOpen) closeMobile(); else setMobileOpen(true);
                  }}
                >
                  <span
                    className={`burger ${mobileOpen ? 'burger--active' : ''}`}
                    aria-hidden="true"
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </button>
            </div>
        </header>
        {(mobileOpen || mobileExiting) && (
          <>
          <div className={`mobile-backdrop ${mobileExiting ? 'mobile-backdrop--exit' : ''}`} onClick={closeMobile} />
          <nav className={`mobile-nav ${mobileExiting ? 'mobile-nav--exit' : ''}`}>
            <Link href="/" onClick={closeMobile}>Product</Link>
            <Link href="/" onClick={closeMobile} className="inline-icon">Use Cases <span className="material-icons-outlined" aria-hidden>expand_more</span></Link>
            <Link href="/" onClick={closeMobile}>Pricing</Link>
            <Link href="/" onClick={closeMobile}>Blog</Link>
            <Link href="/" onClick={closeMobile} className="inline-icon">Resources <span className="material-icons-outlined" aria-hidden>expand_more</span></Link>
            <div className="mobile-nav__cta">
              <button type="button" onClick={closeMobile} className="btn btn-primary text-sm">
                Fermer
              </button>
            </div>
          </nav>
          </>
        )}
        </>
    );
}
