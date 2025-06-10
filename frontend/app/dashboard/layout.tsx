"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { SidebarProvider } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "../../layout/Backdrop";
import React from "react";
import "@/app/globals.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <SidebarProvider>
            {/* Main layout container using flexbox for sidebar and content */}
            <div className="relative flex min-h-screen bg-gray-100 dark:bg-gray-900">
              {/* Sidebar - fixed height and width handled within AppSidebar */}
              <div className="fixed inset-y-0 left-0 z-30">
                <AppSidebar />
              </div>

              {/* Backdrop for smaller screens */}
              <Backdrop />

              {/* Main Content Area - takes remaining width, is a flex column, and scrolls */}
              <div className="flex flex-1 flex-col overflow-x-hidden md:ml-64">
                {/* Header - sticky at the top of this flex column */}
                <AppHeader />

                {/* Page Content - This area scrolls independently and fills the space below the header */}
                <main className="flex-1 overflow-y-auto bg-white p-4 sm:p-6 lg:p-8 dark:bg-gray-800">
                  {children}
                </main>
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
