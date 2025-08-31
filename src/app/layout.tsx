import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarTrigger } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/sidebar-nav';
import { Pill } from 'lucide-react';
import Link from 'next/link';
import { UserNav } from '@/components/user-nav';
import { AuthProvider } from '@/hooks/use-auth';

export const metadata: Metadata = {
  title: 'Apotheca Central',
  description: 'The central portal for pharmacy management.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        <AuthProvider>
          <SidebarProvider>
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
              <Sidebar className="hidden border-r bg-card text-card-foreground md:block">
                <SidebarHeader className="flex h-16 items-center px-6">
                  <Link href="/" className="flex items-center gap-2 font-semibold text-primary">
                    <Pill className="h-6 w-6" />
                    <span className="">Apotheca Central</span>
                  </Link>
                </SidebarHeader>
                <SidebarContent className="py-4">
                  <SidebarNav />
                </SidebarContent>
              </Sidebar>
              <div className="flex flex-col">
                <header className="flex h-16 items-center gap-4 border-b bg-card px-4 lg:px-6 sticky top-0 z-30">
                  <SidebarTrigger className="shrink-0 md:hidden" />
                  <div className="w-full flex-1">
                    {/* Header content can go here, like a global search */}
                  </div>
                  <UserNav />
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                  {children}
                </main>
              </div>
            </div>
            <Toaster />
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
