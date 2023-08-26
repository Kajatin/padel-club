import './globals.css'
import type { Metadata } from 'next'
import { Tektur } from "next/font/google";

const font = Tektur({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Padel Club",
  description: "Teton padel pros",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
