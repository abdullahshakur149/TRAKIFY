"use client";

import OrdersTable from "@/components/OrdersTable";

export default function ReturnedOrdersPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Returned Orders
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          View all returned orders
        </p>
      </div>
      <OrdersTable />
    </div>
  );
}
