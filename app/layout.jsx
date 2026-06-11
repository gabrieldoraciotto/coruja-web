import "./globals.css";
import { Space_Grotesk, Inter } from "next/font/google";
import { Nav } from "@/components/Nav";
import { DemoBanner } from "@/components/DemoBanner";

// Display geométrica e contemporânea (títulos) — a cara do estúdio noturno.
const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

// Corpo limpo e legível para a interface.
const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata = {
  title: "Coruja — redação automática de conteúdo",
  description:
    "Da notícia ao roteiro pronto: triagem por IA, roteiros por formato e calendário editorial.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
      <body className="font-body min-h-screen">
        <DemoBanner />
        <Nav />
        <main className="mx-auto max-w-6xl px-5 pb-24 pt-8">{children}</main>
      </body>
    </html>
  );
}
