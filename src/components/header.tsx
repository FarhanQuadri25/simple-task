"use client";

import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    router.push("/signin");
  };

  return (
    <header className="w-full px-6 py-4 bg-[#1f1f1f] border-b border-[#333] flex items-center justify-between">
      {/* App Title */}
      <h1 className="text-xl font-bold text-white">Task Manager Pro</h1>

      {/* User Info and Logout */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-gray-300">
          <User className="h-5 w-5" />
          <span className="text-sm">Admin</span>
        </div>
        <Button
          variant="ghost"
          className="text-gray-300 hover:text-red-400 hover:bg-red-500/10"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </Button>
      </div>
    </header>
  );
}
