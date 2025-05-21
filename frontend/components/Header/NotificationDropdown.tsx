"use client";
import { useState } from "react";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";

export const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setHasNotifications(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="relative rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <svg
          className="h-6 w-6 text-gray-600 dark:text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {hasNotifications && (
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></span>
        )}
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="w-80"
      >
        <div className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Notifications
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Mark all as read
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <img
                src="https://ui-avatars.com/api/?name=Sarah+Wilson&background=random"
                alt="Sarah Wilson"
                className="h-10 w-10 rounded-full"
              />
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-white">
                  <span className="font-semibold">Sarah Wilson</span> requested
                  to join your team
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  2 minutes ago
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <img
                src="https://ui-avatars.com/api/?name=Mike+Johnson&background=random"
                alt="Mike Johnson"
                className="h-10 w-10 rounded-full"
              />
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-white">
                  <span className="font-semibold">Mike Johnson</span> completed
                  the project setup
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  1 hour ago
                </p>
              </div>
            </div>
          </div>
        </div>
      </Dropdown>
    </div>
  );
};
