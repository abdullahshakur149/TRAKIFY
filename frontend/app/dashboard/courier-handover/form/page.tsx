"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  DocumentTextIcon,
  QrCodeIcon,
  UserIcon,
  ArrowLeftIcon,
  ArrowPathIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export default function CourierHandoverForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const courierType = searchParams.get("type");

  const [trackingNumber, setTrackingNumber] = useState("");
  const [flyerId, setFlyerId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!courierType) {
      router.push("/dashboard/courier-handover");
    }
  }, [courierType, router]);

  const resetForm = () => {
    setTrackingNumber("");
    setFlyerId("");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // TODO: Implement API call to handle courier handover
      console.log({
        courierType,
        trackingNumber,
        flyerId,
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message
      setShowSuccess(true);

      // Reset form
      resetForm();

      // Hide success message after 2 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    } catch (err) {
      setError("Failed to process handover. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!courierType) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-block rounded-full bg-blue-100 p-4">
              <DocumentTextIcon className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="mb-2 text-2xl font-semibold">
              Courier Handover Form
            </h2>
            <p className="text-gray-600">
              Complete the form to hand over your shipment to {courierType}
            </p>
          </div>

          {showSuccess && (
            <div className="mb-6 text-center">
              <div className="mb-4 inline-block animate-bounce rounded-full bg-green-100 p-4">
                <CheckCircleIcon className="h-12 w-12 text-green-600" />
              </div>
              <p className="font-medium text-green-600">
                Handover successful! Ready for next scan.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tracking Number Input */}
            <div>
              <label
                htmlFor="trackingNumber"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Tracking Number
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="trackingNumber"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-2 pr-12 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter tracking number"
                  required
                  autoFocus
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-2 -translate-y-1/2 p-2 text-gray-500 transition-colors hover:text-blue-600"
                >
                  <QrCodeIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Flyer ID Input */}
            <div>
              <label
                htmlFor="flyerId"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Flyer ID
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="flyerId"
                  value={flyerId}
                  onChange={(e) => setFlyerId(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter flyer ID"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center rounded-lg bg-red-50 p-4 text-red-600">
                <svg
                  className="mr-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {error}
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex items-center rounded-lg border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50"
              >
                <ArrowLeftIcon className="mr-2 h-5 w-5" />
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <ArrowPathIcon className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Submit Handover"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
