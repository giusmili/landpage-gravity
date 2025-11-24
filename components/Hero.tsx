import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="hero">
            <div className="hero-brand">
             
                <span className="brand-name">
                    Gravity
                </span>
            </div>
            <h1 className="hero-title">
                Experience liftoff
            </h1>
            <p className="hero-subtitle">
                with the next-generation IDE
            </p>
            <div className="hero-buttons">
                <Link
                    href="/"
                    className="btn btn-primary"
                >
                    <svg
                        className=""
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path d="M11.13 1.5H3.5v7.63h7.63V1.5zm0 13.37H3.5v7.63h7.63V14.87zm9.37-13.37h-7.63v7.63h7.63V1.5zm-7.63 13.37h7.63v7.63h-7.63V14.87z" />
                    </svg>
                    Download for Windows
                </Link>
                <Link
                    href="/"
                    className="btn btn-secondary"
                >
                    Explore use cases
                </Link>
            </div>
        </section>
    );
}
