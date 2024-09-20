import Navbar from "@/components/Shared/Navbar";
import "../globals.css";

export default function RootLayout({children}) {
    return (
        <div>
            <Navbar />
            <div>
                {children}
            </div>
        </div>
    )
}