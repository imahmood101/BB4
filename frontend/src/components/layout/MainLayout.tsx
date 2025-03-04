import { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Sales Dashboard</h1>
          <nav className="flex items-center space-x-4">
            <button className="text-sm text-muted-foreground hover:text-foreground">
              Profile
            </button>
            <button className="text-sm text-muted-foreground hover:text-foreground">
              Logout
            </button>
          </nav>
        </div>
      </header>
      <div className="flex">
        <aside className="w-64 border-r min-h-[calc(100vh-4rem)]">
          <nav className="p-4 space-y-2">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted"
            >
              Leads
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted"
            >
              Analytics
            </a>
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 