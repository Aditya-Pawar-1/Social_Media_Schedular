import { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { MenuIcon } from "lucide-react";


const pageTitles : Record<string, string> = {
  "/dashboard": "Dashboard",
  "/accounts": "Accounts",
  "/scheduler": "Scheduler",
  "/ai-composer": "AI Composer",
};

const Layout = () => {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "Social AI";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen bg-slate-50">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      <Sidebar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 flex items-center bg-white border-b border-slate-200 px-4
        md:px-6 gap-4">

          <button className="md:hidden p-2 -ml-2 text-slate-500" onClick={() => setIsMobileMenuOpen(true)}>
            <MenuIcon className="size-6" />
          </button>

          <div>
            <h1 className="text-slate-900">
              {title} 
            </h1>
            <p className="text-slate-400 text-sm hidden sm:block">Manage and automate your social presence</p>
            
          </div>

        </header>
        <main className="flex-1 overflow-auto p-4  sm:p-6 md:p-8 xl:p-12">
            <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
