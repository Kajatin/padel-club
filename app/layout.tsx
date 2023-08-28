import './globals.css'
import type { Metadata } from 'next'
import { Tektur } from "next/font/google";

const font = Tektur({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Padel Club",
  description: "Teton padel pros",
};

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={
          font.className +
          " flex flex-col justify-center items-center w-screen my-10"
        }
      >
        {children}
      </body>
    </html>
  );
}
