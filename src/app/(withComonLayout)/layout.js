import Navbar from "@/components/Shared/Navbar";
import "../globals.css";
import Footer from "@/components/Shared/Footer";

export default function RootLayout({children}) {
    return (
        <div>
            <Navbar />
            <div>
                {children}
            </div>
            <Footer />
        </div>
    )
}