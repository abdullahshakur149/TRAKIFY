import type { Metadata } from "next";
import "../globals.css";



export const metadata: Metadata = {
  title: "Trakify",
  description: "Saas Product for C-ecommerce Stores",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
