import { Poppins, Roboto, Oxanium } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/authContext";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const oxanium = Oxanium({
  variable: "--font-oxanium",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${roboto.variable} ${oxanium.variable} antialiased transition-all duration-200`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
