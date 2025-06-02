import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../lib/useAuth";
import { PlanProvider } from "../lib/usePlan";
import LayoutWithNavbar from "../components/LayoutWithNavbar";
import PageTransition from "../components/PageTransition";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ColdReach AI - AI-Powered Cold Email Generator",
  description: "Generate personalized cold emails that get responses using AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <PlanProvider>
            <LayoutWithNavbar>
              <PageTransition>{children}</PageTransition>
            </LayoutWithNavbar>
          </PlanProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
