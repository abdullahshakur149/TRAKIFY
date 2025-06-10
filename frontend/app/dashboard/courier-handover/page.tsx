"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TruckIcon,
  ClipboardDocumentCheckIcon,
  QrCodeIcon,
  ShieldCheckIcon,
  ClockIcon,
  ArrowPathIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  TruckIcon as TruckIconSolid,
} from "@heroicons/react/24/outline";

export default function CourierHandoverPage() {
  const router = useRouter();
  const [selectedCourier, setSelectedCourier] = useState<string | null>(null);

  const handleCourierSelect = (courierType: string) => {
    setSelectedCourier(courierType);
    router.push(`/dashboard/courier-handover/form?type=${courierType}`);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mb-4 flex items-center justify-center">
            <TruckIcon className="h-16 w-16 text-white/90" />
          </div>
          <h1 className="mb-4 text-center text-4xl font-bold">
            Courier Handover System
          </h1>
          <p className="mx-auto max-w-2xl text-center text-xl opacity-90">
            Select a courier service to begin the handover process
          </p>
        </div>
      </div>

      {/* Service Selection */}
      <div className="container mx-auto px-4">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-block rounded-full bg-blue-100 p-4">
              <ClipboardDocumentCheckIcon className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="mb-2 text-2xl font-semibold">
              Select Courier Service
            </h2>
            <p className="text-gray-600">
              Choose the courier service for shipment handover
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Daewoo Express */}
            <button
              onClick={() => handleCourierSelect("Daewoo")}
              className="group rounded-lg border-2 border-gray-200 bg-white p-6 transition-all duration-200 hover:border-blue-500 hover:shadow-lg"
            >
              <div className="text-center">
                <div className="mb-4 inline-block rounded-full bg-blue-50 p-4 transition-colors group-hover:bg-blue-100">
                  <BuildingOfficeIcon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Daewoo Express</h3>
                <p className="text-sm text-gray-500 group-hover:text-gray-700">
                  Fast and reliable delivery service
                </p>
              </div>
            </button>

            {/* Trax */}
            <button
              onClick={() => handleCourierSelect("Trax")}
              className="group rounded-lg border-2 border-gray-200 bg-white p-6 transition-all duration-200 hover:border-blue-500 hover:shadow-lg"
            >
              <div className="text-center">
                <div className="mb-4 inline-block rounded-full bg-blue-50 p-4 transition-colors group-hover:bg-blue-100">
                  <TruckIconSolid className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Trax Logistics</h3>
                <p className="text-sm text-gray-500 group-hover:text-gray-700">
                  Professional logistics solutions
                </p>
              </div>
            </button>

            {/* PostEx */}
            <button
              onClick={() => handleCourierSelect("PostEx")}
              className="group rounded-lg border-2 border-gray-200 bg-white p-6 transition-all duration-200 hover:border-blue-500 hover:shadow-lg"
            >
              <div className="text-center">
                <div className="mb-4 inline-block rounded-full bg-blue-50 p-4 transition-colors group-hover:bg-blue-100">
                  <GlobeAltIcon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Postex Courier</h3>
                <p className="text-sm text-gray-500 group-hover:text-gray-700">
                  Nationwide delivery network
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto mt-12 px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Quick Scanning */}
          <div className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
            <div className="mb-4 text-blue-600">
              <QrCodeIcon className="h-8 w-8" />
            </div>
            <h4 className="mb-2 text-lg font-semibold">Quick Scanning</h4>
            <p className="text-gray-600">
              Easily scan tracking numbers for fast handover process
            </p>
          </div>

          {/* Real-time Updates */}
          <div className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
            <div className="mb-4 text-blue-600">
              <ClockIcon className="h-8 w-8" />
            </div>
            <h4 className="mb-2 text-lg font-semibold">Real-time Updates</h4>
            <p className="text-gray-600">
              Track handover status and courier pickups instantly
            </p>
          </div>

          {/* Secure Handover */}
          <div className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
            <div className="mb-4 text-blue-600">
              <ShieldCheckIcon className="h-8 w-8" />
            </div>
            <h4 className="mb-2 text-lg font-semibold">Secure Handover</h4>
            <p className="text-gray-600">
              Verified process with flyer ID confirmation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
