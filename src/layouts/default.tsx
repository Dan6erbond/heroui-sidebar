import { Link } from '@heroui/link';

import { Navbar, Sidebar } from '@/components/navigation';
import { SidebarInset, SidebarProvider } from '@/components/sidebar';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar />

        <SidebarInset className="container mx-auto px-6 overflow-y-auto">
          <Navbar />
          {children}
          <footer className="w-full flex items-center justify-center py-3">
            <Link
              isExternal
              className="flex items-center gap-1 text-current"
              href="https://heroui.com"
              title="heroui.com homepage"
            >
              <span className="text-default-600">Powered by</span>
              <p className="text-primary">HeroUI</p>
            </Link>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
