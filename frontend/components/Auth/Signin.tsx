"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Signin = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  return (
    <>
      <div className="fle-col flex min-h-screen items-center justify-center">
        <div className="px-4 py-6">
          <div className="grid w-full max-w-6xl items-center gap-6 md:grid-cols-2">
            <div className="max-w-md rounded-lg border border-slate-300 p-6 shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
              <form className="space-y-6">
                <div className="mb-12">
                  <h3 className="text-3xl font-semibold text-slate-900">
                    Sign in
                  </h3>
                  <p className="mt-6 text-sm leading-relaxed text-slate-500">
                    Sign in to your account and explore a world of
                    possibilities. Your journey begins here.
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-800">
                    User name
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="username"
                      type="text"
                      required
                      className="w-full rounded-lg border border-slate-300 py-3 pr-10 pl-4 text-sm text-slate-800 outline-blue-600"
                      placeholder="Enter user name"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="absolute right-4 h-[18px] w-[18px]"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="10"
                        cy="7"
                        r="6"
                        data-original="#000000"
                      ></circle>
                      <path
                        d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                        data-original="#000000"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-800">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="password"
                      type="password"
                      required
                      className="w-full rounded-lg border border-slate-300 py-3 pr-10 pl-4 text-sm text-slate-800 outline-blue-600"
                      placeholder="Enter password"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="absolute right-4 h-[18px] w-[18px] cursor-pointer"
                      viewBox="0 0 128 128"
                    >
                      <path
                        d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                        data-original="#000000"
                      ></path>
                    </svg>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 shrink-0 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label className="ml-3 block text-sm text-slate-500">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="jajvascript:void(0);"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div className="!mt-12">
                  <button
                    type="button"
                    className="w-full cursor-pointer rounded-lg bg-blue-600 px-4 py-2.5 text-[15px] font-medium tracking-wide text-white shadow-xl hover:bg-blue-700 focus:outline-none"
                  >
                    Sign in
                  </button>
                  <p className="!mt-6 text-center text-sm text-slate-500">
                    Don't have an account{" "}
                    <a
                      href="/Onboarding/auth/signup"
                      className="ml-1 font-medium whitespace-nowrap text-blue-600 hover:underline"
                    >
                      Register here
                    </a>
                  </p>
                </div>
              </form>
            </div>

            <div className="max-md:mt-8">
              <img
                src="https://readymadeui.com/login-image.webp"
                className="mx-auto block aspect-[71/50] w-full object-cover max-md:w-4/5"
                alt="login img"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
