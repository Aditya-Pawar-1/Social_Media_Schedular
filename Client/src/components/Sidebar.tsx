import {
  CalendarDaysIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  UserIcon,
  Wand2Icon,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) => {
  const { logout, user } = {
    logout: () => {
      window.location.href = "/";
    },
    user: { name: "John Doe", email: "john.doe@example.com" },
  };
  const location = useLocation();
  const navItems = [
    { name: "Dashboard", icon: LayoutDashboardIcon, path: "/dashboard" },
    { name: "Accounts", icon: UserIcon, path: "/accounts" },
    { name: "Scheduler", icon: CalendarDaysIcon, path: "/scheduler" },
    { name: "AI Composer", icon: Wand2Icon, path: "/ai-composer" },
  ];
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col h-full transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    `}
    >
      {/* Logo */}
      <div className="p-6 pb-4">
        <div className="text-xl tracking-tight text-slate-800 flex items-center gap-1.5">
          <img src="/logo.svg" alt="Logo" className="size-6" />
          <span className="font-light">Social Scheduler</span>
        </div>
      </div>

      {/* Nav Section label */}
      <div className="px-6 py-2">
        <span className="text-slate-500 text-xs uppercase tracking-wider">
          Menu
        </span>
      </div>

      {/* Nav Links */}
      <nav className="px-3 space-y-1 flex-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/dashboard"}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded transition-all duration-150 border
              ${isActive ? "text-blue-600 bg-blue-50 border-blue-100" : "text-slate-500 hover:bg-slate-50 border-transparent hover:text-slate-700"}`}
            >
              <item.icon
                className={`size-4.5 shrink-0 
                ${isActive ? "text-blue-600" : "text-slate-500"}`}
              />
              <span>{item.name}</span>
              {isActive && (
                <span className="ml-auto w-1.25 h-5 rounded-full bg-blue-600" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors duration-150">
          <div className="flex items-center justify-center size-8 rounded-full bg-linear-to-r from-blue-500 to-purple-500 text-white text-sm font-medium shrink-0">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-sm truncate text-slate-800">{user?.name}</div>
            <div className="text-xs truncate text-slate-400">{user?.email}</div>
          </div>
        </div>
        <button
          onClick={logout}
          className="mt-1 flex items-center gap-2 px-3 py-2 w-full rounded text-sm  text-slate-500 hover:bg-blue-50 hover:text-blue-500 transition-all duration-150"
        >
          <LogOutIcon className="size-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
