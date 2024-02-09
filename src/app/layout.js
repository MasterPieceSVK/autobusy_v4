import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  manifest: "/manifest.json",
  title: "Departures",
  description: "Departures",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-E7NY2W59JZ"
        />

        <Script id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TNV5ZPSTFW');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <div>
          <Nav></Nav>
          {children}
        </div>
      </body>
    </html>
  );
}
