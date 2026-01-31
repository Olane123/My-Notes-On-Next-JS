import React from "react";
import {Metadata} from "next";

import Header from "@/src/app/Components/Header";

import localFont from 'next/font/local'
import "@/src/app/styles/style.css"
import Inputs from "@/src/app/Components/Inputs";

const myFont = localFont({src: '/fonts/Manrope.ttf',})

export const metadata: Metadata = {
    title: "Мои заметки"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={myFont.className}>
        <Header/>
        {children}
        <Inputs/>
      </body>
    </html>
  );
}
