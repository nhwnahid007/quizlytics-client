import "../globals.css";
import Footer from "@/components/Shared/Footer";
import AuthProviders from "@/providers/AuthProviders";
import Sidebar from "@/components/Shared/Sidebar";

export default function RootLayout({ children }) {
    return (
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex-grow">
                <AuthProviders>
                  <div>
                    {children}
                  </div>
                </AuthProviders>
              </div>
            </div>
         
    )
}