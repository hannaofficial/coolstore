import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/navbar";
import Container from "./components/global/container";
import Providers from "./Providers";
import  {ClerkProvider} from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "a next store",
  description: "A store built in next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" >
        <body className={inter.className}>
          <Providers>
            <Navbar/>
            <Container className="py-20">{children}</Container>
          </Providers>
          </body>
      </html>
    </ClerkProvider>
  );
}
