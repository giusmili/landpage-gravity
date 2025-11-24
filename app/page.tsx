import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function Home() {
    return (
        <div className="page">
            <div className="background-pattern"></div>
            <div className="hero-pattern"></div>
            <div className="container">
                <Header />
                <Hero />
                <footer className="site-footer">
                    <p>© LGC - 2025</p>
                </footer>
            </div>
        </div>
    );
}
