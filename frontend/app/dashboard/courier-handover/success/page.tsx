"use client";

import { useRouter } from "next/navigation";
import {
  CheckCircleIcon,
  ArrowPathIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

export default function CourierHandoverSuccess() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="mb-6 inline-block animate-bounce rounded-full bg-green-100 p-4">
            <CheckCircleIcon className="h-12 w-12 text-green-600" />
          </div>

          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Handover Successful!
          </h2>
          <p className="mb-8 text-lg text-gray-600">
            Your shipment has been successfully handed over to the courier
            service.
          </p>

          <div className="space-y-4">
            <button
              onClick={() => router.push("/dashboard/courier-handover")}
              className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
            >
              <ArrowPathIcon className="mr-2 h-5 w-5" />
              Handover Another Shipment
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="flex w-full items-center justify-center rounded-lg border border-gray-300 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50"
            >
              <HomeIcon className="mr-2 h-5 w-5" />
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
