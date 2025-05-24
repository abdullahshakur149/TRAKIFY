"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { toast } from "react-hot-toast";
import { HexColorPicker } from "react-colorful";

interface Courier {
  id: string;
  name: string;
  logo: string;
  description: string;
}

const couriers: Courier[] = [
  {
    id: "trax",
    name: "Trax",
    logo: "/icons/trax.svg",
    description: "Fast and reliable delivery service",
  },
  {
    id: "postex",
    name: "Postex",
    logo: "/icons/postex.svg",
    description: "Nationwide delivery network",
  },
  {
    id: "daewoo",
    name: "Daewoo",
    logo: "/icons/daewoo.svg",
    description: "Express delivery solutions",
  },
];

const themeColors = [
  { name: "Blue", value: "#3B82F6" },
  { name: "Purple", value: "#8B5CF6" },
  { name: "Green", value: "#10B981" },
  { name: "Red", value: "#EF4444" },
  { name: "Orange", value: "#F97316" },
];

export default function OrganizationSetup() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    logo: null as File | null,
    themeColor: themeColors[0].value,
    selectedCouriers: [] as string[],
    courierApiKeys: {} as Record<string, string>,
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Calculate form completion percentage
  useEffect(() => {
    let total = 5; // Total number of fields/sections contributing to progress
    let completed = 0;

    // Organization name
    if (formData.name.trim()) completed++;

    // Logo
    if (formData.logo) completed++;

    // Theme color
    if (formData.themeColor) completed++;

    // Selected couriers
    if (formData.selectedCouriers.length > 0) completed++;

    // API keys
    if (
      formData.selectedCouriers.length > 0 &&
      Object.keys(formData.courierApiKeys).length ===
        formData.selectedCouriers.length
    )
      completed++;
    // Note: API keys are only considered complete if couriers are selected AND all selected couriers have keys

    setCompletionPercentage((completed / total) * 100);
  }, [formData]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && step < 3) {
        setStep(step + 1);
      } else if (e.key === "ArrowLeft" && step > 1) {
        setStep(step - 1);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [step]);

  // Add click outside handler for color picker
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('button[type="button"]')
      ) {
        setShowColorPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleLogoFile(file);
    }
  };

  const handleLogoFile = (file: File) => {
    setFormData({ ...formData, logo: file });
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleLogoFile(file);
    }
  };

  const handleCourierToggle = (courierId: string) => {
    setFormData((prev) => {
      const selectedCouriers = prev.selectedCouriers.includes(courierId)
        ? prev.selectedCouriers.filter((id) => id !== courierId)
        : [...prev.selectedCouriers, courierId];

      const courierApiKeys = { ...prev.courierApiKeys };
      if (!selectedCouriers.includes(courierId)) {
        delete courierApiKeys[courierId];
      }

      return {
        ...prev,
        selectedCouriers,
        courierApiKeys,
      };
    });
  };

  const handleApiKeyChange = (courierId: string, apiKey: string) => {
    setFormData((prev) => ({
      ...prev,
      courierApiKeys: {
        ...prev.courierApiKeys,
        [courierId]: apiKey,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Success animation
      const successAnimation = async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        toast.success("Organization setup completed successfully!", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#10B981",
            color: "#fff",
            borderRadius: "10px",
            padding: "16px",
          },
        });

        // Redirect after success
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      };

      successAnimation();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepTitles = [
    "Organization Details",
    "Courier Services",
    "API Configuration",
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 py-8 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-3xl px-2 sm:px-6">
        {/* Progress Bar */}
        <div className="mb-8 h-2 w-full rounded-full bg-gray-300 shadow-inner dark:bg-gray-700">
          <motion.div
            className="bg-brand-500 h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Organization Setup
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Configure your organization settings and integrate with courier
            services
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-8 flex items-center justify-center">
          {[1, 2, 3].map((stepNumber, idx) => (
            <React.Fragment key={stepNumber}>
              <motion.div
                className="flex flex-col items-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.2 }}
              >
                <motion.div
                  className={`z-10 flex h-14 w-14 items-center justify-center rounded-full border-4 text-lg font-bold shadow-md transition-all duration-300 ${
                    step === stepNumber
                      ? "border-blue-600 bg-blue-600 text-white"
                      : step > stepNumber
                      ? "border-brand-300 bg-brand-100 text-brand-500"
                      : "border-gray-300 bg-white text-gray-400 dark:border-gray-700 dark:bg-gray-800"
                  }`}
                  animate={step === stepNumber ? { scale: [1, 1.1, 1] } : {}}
                  transition={
                    step === stepNumber
                      ? { duration: 1.5, repeat: Infinity }
                      : {}
                  }
                >
                  {stepNumber}
                </motion.div>
                <span
                  className={`mt-2 text-xs font-semibold transition-all duration-300 ${
                    step === stepNumber
                      ? "text-brand-500 dark:text-brand-400"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {stepTitles[stepNumber - 1]}
                </span>
              </motion.div>
              {stepNumber !== 3 && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: step > stepNumber ? "100%" : "0%" }}
                  transition={{ duration: 0.5 }}
                  className={`mx-2 h-1 rounded-full transition-all duration-300 sm:w-24 ${
                    step > stepNumber
                      ? "bg-brand-500"
                      : "bg-gray-300 dark:bg-gray-700"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-gray-200 bg-white/90 p-8 shadow-2xl backdrop-blur-md dark:border-gray-700 dark:bg-gray-800/90"
        >
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: step > 1 ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: step > 1 ? -20 : 20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Step 1: Organization Details */}
                {step === 1 && (
                  <div className="space-y-8">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-base font-semibold text-gray-900 dark:text-gray-100"
                      >
                        Organization Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="focus:border-brand-500 focus:ring-brand-500 block w-full rounded-xl border border-gray-300 bg-white px-5 py-3 text-lg text-gray-900 shadow-md transition-all duration-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        required
                        placeholder="Enter your organization name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="logo"
                        className="mb-2 block text-base font-semibold text-gray-900 dark:text-gray-100"
                      >
                        Organization Logo
                      </label>
                      <div className="mt-2 flex flex-wrap items-center gap-8">
                        <motion.label
                          htmlFor="logo"
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          whileHover={{ scale: 1.02 }}
                          className={`group relative flex h-36 w-36 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed bg-gray-50/70 shadow-md transition-all duration-200 dark:bg-gray-700/50 ${
                            isDragging
                              ? "border-brand-500 bg-brand-50/40 dark:border-brand-400 dark:bg-brand-900/20"
                              : "border-brand-300 hover:border-brand-500 hover:bg-brand-50/40 dark:hover:border-brand-400 dark:hover:bg-brand-900/20"
                          }`}
                        >
                          {logoPreview ? (
                            <Image
                              src={logoPreview}
                              alt="Logo preview"
                              width={130}
                              height={130}
                              className="rounded-lg object-contain p-2"
                            />
                          ) : (
                            <div className="text-brand-400 group-hover:text-brand-500 flex flex-col items-center gap-2">
                              <svg
                                className="mb-1 h-12 w-12"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              <span className="text-sm font-medium">
                                {isDragging ? "Drop here" : "Upload Logo"}
                              </span>
                            </div>
                          )}
                          <input
                            type="file"
                            id="logo"
                            accept="image/*"
                            onChange={handleLogoChange}
                            className="hidden"
                          />
                        </motion.label>
                        <div className="flex flex-col gap-2">
                          <span className="text-xs text-gray-600 dark:text-gray-300">
                            Recommended size: 200x200px
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Drag and drop or click to upload
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-base font-semibold text-gray-900 dark:text-gray-100">
                        Theme Color
                      </label>
                      <div className="relative">
                        <div className="mt-2 flex items-center gap-5">
                          {/* Button to open the color picker */}
                          <motion.button
                            type="button"
                            onClick={() => setShowColorPicker(!showColorPicker)}
                            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <motion.div
                              className="h-5 w-5 rounded-full border border-gray-400 shadow-inner dark:border-gray-600"
                              style={{ backgroundColor: formData.themeColor }}
                              initial={{ scale: 0.8 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.2 }}
                            />
                            Select Color
                          </motion.button>

                          {/* Display preset colors as non-interactive indicators */}
                          <div className="flex gap-3">
                            {themeColors.map((color, index) => (
                              <div
                                key={color.value}
                                className={`relative h-8 w-8 rounded-full border-2 shadow-sm ${
                                  formData.themeColor === color.value
                                    ? "border-brand-500 ring-brand-400 ring-2"
                                    : "border-gray-200 dark:border-gray-600"
                                }`}
                                style={{ backgroundColor: color.value }}
                              >
                                <span className="sr-only">{color.name}</span>
                                <AnimatePresence>
                                  {formData.themeColor === color.value && (
                                    <motion.svg
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      exit={{ scale: 0 }}
                                      className="absolute inset-0 m-auto h-4 w-4 text-white drop-shadow-lg"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </motion.svg>
                                  )}
                                </AnimatePresence>
                              </div>
                            ))}
                          </div>
                        </div>

                        <AnimatePresence>
                          {showColorPicker && (
                            <motion.div
                              ref={colorPickerRef}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute top-full left-0 z-50 mt-4"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="rounded-xl bg-white p-4 shadow-xl dark:bg-gray-800">
                                <HexColorPicker
                                  color={formData.themeColor}
                                  onChange={(color) => {
                                    setFormData({
                                      ...formData,
                                      themeColor: color,
                                    });
                                  }}
                                />
                                <div className="mt-4 flex justify-end">
                                  <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setShowColorPicker(false)}
                                    className="bg-brand-500 hover:bg-brand-600 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200"
                                  >
                                    Done
                                  </motion.button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                )}

                {/* Divider */}
                {step === 1 && (
                  <div className="border-t border-gray-200 dark:border-gray-700" />
                )}

                {/* Step 2: Courier Selection */}
                {step === 2 && (
                  <div className="space-y-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-brand-50/40 dark:bg-brand-900/10 flex flex-col items-center rounded-lg p-6 shadow-sm"
                    >
                      <h3 className="text-brand-600 dark:text-brand-400 mb-1 text-xl font-bold">
                        Select Courier Services
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Choose the courier services you want to integrate with
                        your organization
                      </p>
                    </motion.div>
                    <div className="grid gap-6 sm:grid-cols-2">
                      {couriers.map((courier, index) => (
                        <motion.div
                          key={courier.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`group relative flex flex-col items-center gap-2 rounded-xl border-2 p-6 transition-all duration-200 hover:shadow-xl ${
                            formData.selectedCouriers.includes(courier.id)
                              ? "border-brand-500 bg-brand-50/60 dark:border-brand-400 dark:bg-brand-900/20"
                              : "border-gray-200 bg-white/70 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/50"
                          }`}
                        >
                          <div className="flex w-full items-center gap-4">
                            <motion.div
                              whileHover={{ rotate: 5 }}
                              className="flex h-16 w-16 items-center justify-center rounded-lg bg-white p-3 shadow-md dark:bg-gray-700"
                            >
                              <Image
                                src={courier.logo}
                                alt={courier.name}
                                width={48}
                                height={48}
                                className="object-contain"
                              />
                            </motion.div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                  {courier.name}
                                </h4>
                                <motion.div
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <input
                                    type="checkbox"
                                    checked={formData.selectedCouriers.includes(
                                      courier.id,
                                    )}
                                    onChange={() =>
                                      handleCourierToggle(courier.id)
                                    }
                                    className="text-brand-500 focus:ring-brand-500 h-5 w-5 rounded border-gray-300 transition-all duration-200 dark:border-gray-600"
                                  />
                                </motion.div>
                              </div>
                              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                {courier.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Divider */}
                {step === 2 && (
                  <div className="border-t border-gray-200 dark:border-gray-700" />
                )}

                {/* Step 3: API Keys */}
                {step === 3 && (
                  <div className="space-y-8">
                    <div className="bg-brand-50/40 dark:bg-brand-900/10 flex flex-col items-center rounded-lg p-6 shadow-sm">
                      <h3 className="text-brand-600 dark:text-brand-400 mb-1 text-xl font-bold">
                        Enter API Keys
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Provide API keys for your selected courier services
                      </p>
                    </div>
                    {formData.selectedCouriers.map((courierId) => {
                      const courier = couriers.find((c) => c.id === courierId);
                      return (
                        <div
                          key={courierId}
                          className="flex items-center gap-4 rounded-xl border-2 border-gray-200 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-200 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800/70"
                        >
                          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-50 p-3 shadow-md dark:bg-gray-700">
                            <Image
                              src={courier?.logo || ""}
                              alt={courier?.name || ""}
                              width={40}
                              height={40}
                              className="object-contain"
                            />
                          </div>
                          <div className="flex-1">
                            <label
                              htmlFor={`api-key-${courierId}`}
                              className="mb-1 block text-sm font-semibold text-gray-900 dark:text-gray-100"
                            >
                              {courier?.name} API Key
                            </label>
                            <input
                              type="password"
                              id={`api-key-${courierId}`}
                              value={formData.courierApiKeys[courierId] || ""}
                              onChange={(e) =>
                                handleApiKeyChange(courierId, e.target.value)
                              }
                              className="focus:border-brand-500 focus:ring-brand-500 block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all duration-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                              required
                              placeholder={`Enter your ${courier?.name} API key`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between gap-4 pt-8">
              {step > 1 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="rounded-lg border border-gray-300 bg-white px-8 py-3 text-base font-semibold text-gray-900 shadow-md transition-all duration-200 hover:bg-gray-50 hover:shadow-lg dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
                >
                  Previous
                </motion.button>
              )}
              {step < 3 ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="bg-brand-500 hover:bg-brand-600 ml-auto rounded-lg px-10 py-3 text-base font-semibold text-black shadow-lg transition-all duration-200 hover:shadow-xl"
                >
                  Next
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-brand-500 hover:bg-brand-600 ml-auto rounded-lg px-10 py-3 text-base font-semibold text-black shadow-lg transition-all duration-200 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      <span>Setting up...</span>
                    </div>
                  ) : (
                    "Complete Setup"
                  )}
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
