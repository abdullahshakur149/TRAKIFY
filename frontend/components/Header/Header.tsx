"use client";
import { ThemeToggleButton } from "@/components/Common/ThemeToggleButton";
import { NotificationDropdown } from "@/components/Header/NotificationDropdown";
import { ProfileDropdown } from "@/components/Header/ProfileDropdown";

export const Header = () => {
  return (
    <header className="dark:bg-gray-dark sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-800">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Dashboard
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <ThemeToggleButton />
        <NotificationDropdown />
        <ProfileDropdown />
      </div>
    </header>
  );
};
