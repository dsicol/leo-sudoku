import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import NavBar from "@/components/Navbar";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Leo Sudoku",
  description: "Level up your problem solving skills with these 5 puzzles",
};

// Children components are still server components as Navbar does not import them
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <NavBar />
          <AntdRegistry>{children}</AntdRegistry>
        </main>
      </body>
    </html>
  );
};
