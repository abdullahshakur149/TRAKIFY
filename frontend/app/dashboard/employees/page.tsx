"use client";

import EmployeesTable from "@/components/EmployeesTable";

export default function AllEmployeesPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          All Employees
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          View and manage all your employees
        </p>
      </div>
      <EmployeesTable />
    </div>
  );
}
