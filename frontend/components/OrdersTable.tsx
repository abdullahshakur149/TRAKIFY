"use client";

import { useState, useRef, useEffect } from "react";
import {
  PencilIcon,
  TrashIcon,
  ChatBubbleLeftIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { createPortal } from "react-dom";

interface Order {
  id: string;
  trackingNumber: string;
  flyerId: string;
  customerName: string;
  customerAddress: string;
  productName: string;
  productQuantity: number;
  status: string;
  latestRemark: string;
  statusHistory: { status: string; date: string }[];
  remarks: { remark: string; date: string }[];
}

// Dummy data
const dummyOrders: Order[] = [
  {
    id: "ORD001",
    trackingNumber: "TRK123456",
    flyerId: "FLY789",
    customerName: "John Doe",
    customerAddress: "123 Main St, City, Country",
    productName: "Premium Headphones",
    productQuantity: 2,
    status: "In Transit",
    latestRemark: "Package picked up by courier",
    statusHistory: [
      { status: "Order Placed", date: "2024-03-20" },
      { status: "Processing", date: "2024-03-21" },
      { status: "In Transit", date: "2024-03-22" },
    ],
    remarks: [
      { remark: "Package picked up by courier", date: "2024-03-22" },
      { remark: "Order confirmed", date: "2024-03-20" },
    ],
  },
];

export default function OrdersTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isRemarksModalOpen, setIsRemarksModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const filteredOrders = dummyOrders.filter((order) =>
    Object.values(order).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  );

  const handleStatusClick = (order: Order) => {
    setSelectedOrder(order);
    setIsStatusModalOpen(true);
  };

  const handleRemarksClick = (order: Order) => {
    setSelectedOrder(order);
    setIsRemarksModalOpen(true);
  };

  const handleEdit = (id: string) => {
    console.log("Edit order:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete order:", id);
  };

  const handleDropdownClick = (orderId: string, button: HTMLButtonElement) => {
    const rect = button.getBoundingClientRect();
    setDropdownPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setIsDropdownOpen(isDropdownOpen === orderId ? null : orderId);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isDropdownOpen &&
        !(event.target as Element).closest(".dropdown-container")
      ) {
        setIsDropdownOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Search orders..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm rounded-md border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none">
          <span className="mr-2">+</span>
          Add Order
        </button>
      </div>

      <div className="relative overflow-x-auto rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Tracking #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Flyer ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.trackingNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{order.flyerId}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.customerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.productName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleStatusClick(order)}
                    className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 hover:bg-blue-200"
                  >
                    {order.status}
                    <ChevronDownIcon className="ml-1 h-4 w-4" />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="dropdown-container">
                    <button
                      ref={(el) => {
                        buttonRefs.current[order.id] = el;
                      }}
                      onClick={(e) =>
                        handleDropdownClick(order.id, e.currentTarget)
                      }
                      className="rounded-full p-1 hover:bg-gray-100"
                    >
                      <span className="text-gray-500">⋮</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isDropdownOpen &&
        createPortal(
          <div
            className="ring-opacity-5 fixed z-50 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
            }}
          >
            <div className="py-1">
              <button
                onClick={() => handleEdit(isDropdownOpen)}
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <PencilIcon className="mr-2 h-4 w-4" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(isDropdownOpen)}
                className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                <TrashIcon className="mr-2 h-4 w-4" />
                Delete
              </button>
              <button
                onClick={() =>
                  handleRemarksClick(
                    dummyOrders.find((o) => o.id === isDropdownOpen)!,
                  )
                }
                className="flex w-full items-center px-4 py-2 text-sm text-green-600 hover:bg-gray-100"
              >
                <ChatBubbleLeftIcon className="mr-2 h-4 w-4" />
                View Remarks
              </button>
            </div>
          </div>,
          document.body,
        )}

      {/* Status History Modal */}
      <Transition appear show={isStatusModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsStatusModalOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="bg-opacity-25 fixed inset-0 bg-black" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Status History
                  </Dialog.Title>
                  <div className="mt-4">
                    {selectedOrder?.statusHistory.map((status, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between border-b border-gray-200 py-2"
                      >
                        <span className="text-sm text-gray-900">
                          {status.status}
                        </span>
                        <span className="text-sm text-gray-500">
                          {status.date}
                        </span>
                      </div>
                    ))}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Remarks Modal */}
      <Transition appear show={isRemarksModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsRemarksModalOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="bg-opacity-25 fixed inset-0 bg-black" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Remarks History
                  </Dialog.Title>
                  <div className="mt-4">
                    {selectedOrder?.remarks.map((remark, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between border-b border-gray-200 py-2"
                      >
                        <span className="text-sm text-gray-900">
                          {remark.remark}
                        </span>
                        <span className="text-sm text-gray-500">
                          {remark.date}
                        </span>
                      </div>
                    ))}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
