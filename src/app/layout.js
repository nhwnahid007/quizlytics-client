import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";

export const metadata = {
  title: "Quizlytics",
  description:
    "A quiz-based analytics platform to test your knowledge and track your performance.",
};

<<<<<<< HEAD
export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body>{children}</body>
=======
export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
       
        {children}
   
      </body>
>>>>>>> 252692e53340a18813cb7f2f5c9a619bfee63c9d
    </html>
  );
}
