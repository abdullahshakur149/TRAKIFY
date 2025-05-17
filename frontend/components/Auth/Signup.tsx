"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  return (
    <>
      {/* <!-- ===== SignUp Form Start ===== --> */}
      <div className="mx-auto mt-25 max-w-4xl p-6 max-sm:max-w-lg">
        <div className="mb-12 text-center sm:mb-16">
          <a href="javascript:void(0)">
            <img
              src="https://readymadeui.com/readymadeui.svg"
              alt="logo"
              className="inline-block w-44"
            />
          </a>
          <h4 className="mt-6 text-base text-slate-600">
            Sign up into your account
          </h4>
        </div>

        <form>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                First Name
              </label>
              <input
                name="name"
                type="text"
                className="w-full rounded bg-slate-100 px-4 py-3 text-sm text-slate-800 outline-blue-500 transition-all focus:bg-transparent"
                placeholder="Enter name"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Last Name
              </label>
              <input
                name="lname"
                type="text"
                className="w-full rounded bg-slate-100 px-4 py-3 text-sm text-slate-800 outline-blue-500 transition-all focus:bg-transparent"
                placeholder="Enter last name"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Email Id
              </label>
              <input
                name="email"
                type="text"
                className="w-full rounded bg-slate-100 px-4 py-3 text-sm text-slate-800 outline-blue-500 transition-all focus:bg-transparent"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Mobile No.
              </label>
              <input
                name="number"
                type="number"
                className="w-full rounded bg-slate-100 px-4 py-3 text-sm text-slate-800 outline-blue-500 transition-all focus:bg-transparent"
                placeholder="Enter mobile number"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Password
              </label>
              <input
                name="password"
                type="password"
                className="w-full rounded bg-slate-100 px-4 py-3 text-sm text-slate-800 outline-blue-500 transition-all focus:bg-transparent"
                placeholder="Enter password"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Confirm Password
              </label>
              <input
                name="cpassword"
                type="password"
                className="w-full rounded bg-slate-100 px-4 py-3 text-sm text-slate-800 outline-blue-500 transition-all focus:bg-transparent"
                placeholder="Enter confirm password"
              />
            </div>
          </div>

          <div className="mt-12">
            <button
              type="button"
              className="mx-auto block cursor-pointer rounded bg-blue-600 px-6 py-3 text-sm font-medium tracking-wider text-white hover:bg-blue-700 focus:outline-none"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
      {/* <!-- ===== SignUp Form End ===== --> */}
    </>
  );
};

export default Signup;
