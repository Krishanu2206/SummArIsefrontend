import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { getGlobalData, getGlobalPageMetadata } from "@/data/loaders";
import Header from "@/components/custom/header";
import { Footer } from "@/components/custom/footer";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getGlobalPageMetadata();

  return {
    title: metadata?.data?.title ?? "SummArise",
    description: metadata?.data?.description ?? "SummArIse : Utilise the power of AI",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalData = await getGlobalData();
  console.dir(globalData, {depth : null});
  const headerdata = globalData.data.header;
  const footerdata = globalData.data.footer;
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="bottom-center" richColors closeButton/>
        <Header data={headerdata}/>
        <>{children}</>
        <Footer data={footerdata}/>
      </body>
    </html>
  );
}
