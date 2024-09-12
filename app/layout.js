import { AuthProvider } from "./context/AuthContext";
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Farm Riders",
  description: "Elevating harvests to highways",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
