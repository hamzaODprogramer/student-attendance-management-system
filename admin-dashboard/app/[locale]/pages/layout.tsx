import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import SideBar from "../components/SideBar";
import Nav from "../components/Nav";
import { NextIntlClientProvider, useMessages  } from "next-intl";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {

  const messages = useMessages()
  
  return (
    <NextIntlClientProvider locale={locale} messages={messages} >
      <html lang={locale} className="h-full">
        <body className={inter.className+' h-full bg-[#f4f5fa]'} >
          <div className="flex">
            <SideBar />
            <div className="w-full">
              <Nav />
              {children}
            </div>
          </div>
        </body>
      </html>
    </NextIntlClientProvider>
  );
}