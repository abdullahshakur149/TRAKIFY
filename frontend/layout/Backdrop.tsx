"use client";

import { useSidebar } from "@/context/SidebarContext";

const Backdrop = () => {
  const { isMobileOpen, toggleMobileSidebar } = useSidebar();

  return (
    <div
      className={`fixed inset-0 z-20 bg-black/50 transition-opacity duration-200 md:hidden ${
        isMobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      onClick={toggleMobileSidebar}
    />
  );
};

export default Backdrop;
