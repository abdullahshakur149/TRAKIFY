"use client";
import Image from "next/image";
import { useState } from "react";

const Hero = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="overflow-hidden pt-35 pb-20 md:pt-40 xl:pt-46 xl:pb-25">
        <div className="max-w-c-1390 mx-auto px-4 md:px-8 2xl:px-0">
          <div className="flex lg:items-center lg:gap-8 xl:gap-32.5">
            <div className="md:w-1/2">
              <h4 className="mb-4.5 text-lg font-medium text-black dark:text-white">
                🚚 Trackify - Smart SaaS for Courier Management
              </h4>
              <h1 className="xl:text-hero mb-5 pr-16 text-3xl font-bold text-black dark:text-white">
                The Ultimate Platform to Track, Manage, and Scale Your Orders
                Across All Couriers{" "}
                <span className="before:bg-titlebg dark:before:bg-titlebgdark relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full">
                  with Trackify SaaS
                </span>
              </h1>
              <p>
                Trackify empowers eCommerce businesses with real-time courier
                tracking, automated order status updates, and seamless
                integrations – all in one fast, scalable, and secure SaaS
                platform. Built with Next.js, MongoDB, and powerful courier
                APIs.
              </p>

              <div className="mt-10">
                <form onSubmit={handleSubmit}>
                  <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="Enter your email address"
                      className="focus:ring-primary focus:border-primary w-full flex-1 rounded-full border border-gray-300 bg-white px-6 py-3 text-base placeholder-gray-500 transition duration-200 focus:ring-2 focus:outline-none sm:w-auto dark:border-gray-700 dark:bg-zinc-900"
                    />
                    <button
                      aria-label="get started button"
                      className="from-primary dark:from-btndark dark:to-blackho w-full rounded-full bg-gradient-to-r to-indigo-600 px-7 py-3 font-medium text-white shadow-md transition-all duration-300 ease-in-out hover:shadow-lg hover:brightness-110 sm:w-auto"
                    >
                      Get Started
                    </button>
                  </div>
                </form>

                <p className="mt-5 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300">
                  🚀{" "}
                  <span className="font-medium text-black dark:text-white">
                    Try Trackify free
                  </span>{" "}
                  — no credit card required.
                </p>
              </div>
            </div>

            <div className="animate_right hidden md:w-1/2 lg:block">
              <div className="relative 2xl:-mr-7.5">
                <Image
                  src="/images/shape/shape-01.png"
                  alt="shape"
                  width={46}
                  height={246}
                  className="absolute top-0 -left-11.5"
                />
                <Image
                  src="/images/shape/shape-02.svg"
                  alt="shape"
                  width={36.9}
                  height={36.7}
                  className="absolute right-0 bottom-0 z-10"
                />
                <Image
                  src="/images/shape/shape-03.svg"
                  alt="shape"
                  width={21.64}
                  height={21.66}
                  className="absolute -right-6.5 bottom-0 z-1"
                />
                <div className="relative aspect-700/444 w-full">
                  <Image
                    className="shadow-solid-l dark:hidden"
                    src="/images/hero/hero-light.svg"
                    alt="Hero"
                    fill
                  />
                  <Image
                    className="shadow-solid-l hidden dark:block"
                    src="/images/hero/hero-dark.svg"
                    alt="Hero"
                    fill
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
