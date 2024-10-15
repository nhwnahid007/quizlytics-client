"use client"
import Navbar from "@/components/Shared/Navbar2";
import Navbar2 from "@/components/Shared/Navbar2";
import "../globals.css";
import Footer from "@/components/Shared/Footer";
import AuthProviders from "@/providers/AuthProviders";

export default function RootLayout({ children }) {
    return (
        <div>
            <AuthProviders>
                <Navbar2 />
                <div>
                    {children}
                </div>
                <Footer />
            </AuthProviders>
        </div>
    )
}