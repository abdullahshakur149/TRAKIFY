"use client";

import OrdersTable from "@/components/OrdersTable";

export default function DeliveredOrdersPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Delivered Orders
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          View all successfully delivered orders
        </p>
      </div>
      <OrdersTable />
    </div>
  );
}
