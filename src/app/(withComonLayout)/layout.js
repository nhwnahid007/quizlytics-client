import "../globals.css";
import Footer from "@/components/Shared/Footer";
import AuthProviders from "@/providers/AuthProviders";
import Header from "@/components/Shared/Navbar/Header";

export default function RootLayout({ children }) {
    return (
        <div>
            <AuthProviders>
                <Header />
                <div>
                    {children}
                </div>
                <Footer />
            </AuthProviders>
        </div>
    )
}