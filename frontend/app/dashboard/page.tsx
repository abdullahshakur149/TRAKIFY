"use client";

import React from "react";
import AnimatedButton from "@/components/AnimatedButton";
import TourBot from "@/components/TourBot";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Welcome to Trakify
          </h1>
          <p className="max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Your all-in-one solution for managing organizations, orders, and
            employees. Get started by adding your organization or take a tour to
            learn more.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <AnimatedButton
              href="/dashboard/organization"
              icon={
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              }
            >
              Add Your Organization
            </AnimatedButton>

            <AnimatedButton
              href="/dashboard/orders/add"
              className="bg-gray-800 hover:bg-gray-700"
              icon={
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              }
            >
              Create Your First Order
            </AnimatedButton>
          </div>
        </div>
      </div>

      <TourBot />
    </div>
  );
}
// change
