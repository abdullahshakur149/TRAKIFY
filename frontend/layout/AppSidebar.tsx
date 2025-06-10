"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import GridIcon from "@/icons/grid.svg";
import CalenderIcon from "@/icons/calender-line.svg";
import ChevronDownIcon from "@/icons/chevron-down.svg";
import HorizontaLDots from "@/icons/horizontal-dots.svg";
import ListIcon from "@/icons/list.svg";
import PageIcon from "@/icons/page.svg";
import PieChartIcon from "@/icons/pie-chart.svg";
import BoxCubeIcon from "@/icons/box-cube.svg";
import PlugInIcon from "@/icons/plug-in.svg";
import TableIcon from "@/icons/table.svg";
import UserCircleIcon from "@/icons/user-circle.svg";
import BuildingIcon from "@/icons/building.svg";
import KeyIcon from "@/icons/key.svg";
import ShoppingBagIcon from "@/icons/shopping-bag.svg";
import UsersIcon from "@/icons/users.svg";
import ChartIcon from "@/icons/chart.svg";
import CreditCardIcon from "@/icons/credit-card.svg";
import SettingsIcon from "@/icons/settings.svg";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  pro?: boolean;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: (
      <GridIcon className="group-hover:text-brand-500 h-5 w-5 text-gray-400 transition-all duration-200 group-hover:scale-110" />
    ),
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: (
      <BuildingIcon className="group-hover:text-brand-500 h-5 w-5 text-gray-400 transition-all duration-200 group-hover:scale-110" />
    ),
    name: "Organization",
    subItems: [
      { name: "Settings", path: "/dashboard/organization", pro: true },
      { name: "Courier Credentials", path: "/dashboard/couriers", pro: true },
    ],
  },
  {
    icon: (
      <ShoppingBagIcon className="group-hover:text-brand-500 h-5 w-5 text-gray-400 transition-all duration-200 group-hover:scale-110" />
    ),
    name: "Orders",
    subItems: [
      { name: "All Orders", path: "/dashboard/orders" },
      { name: "Add Order", path: "/dashboard/orders/add" },
      { name: "Returned Orders", path: "/dashboard/orders/returns" },
    ],
  },
  {
    icon: (
      <UsersIcon className="group-hover:text-brand-500 h-5 w-5 text-gray-400 transition-all duration-200 group-hover:scale-110" />
    ),
    name: "Employees",
    path: "/dashboard/employees",
    pro: true,
  },
  {
    icon: (
      <ChartIcon className="group-hover:text-brand-500 h-5 w-5 text-gray-400 transition-all duration-200 group-hover:scale-110" />
    ),
    name: "Analytics",
    path: "/dashboard/analytics",
  },
];

const othersItems: NavItem[] = [
  {
    icon: (
      <CreditCardIcon className="group-hover:text-brand-500 h-5 w-5 text-gray-400 transition-all duration-200 group-hover:scale-110" />
    ),
    name: "Subscription",
    path: "/dashboard/subscription",
    pro: true,
  },
  {
    icon: (
      <BoxCubeIcon className="group-hover:text-brand-500 h-5 w-5 text-gray-400 transition-all duration-200 group-hover:scale-110" />
    ),
    name: "Admin Panel",
    subItems: [
      {
        name: "Organizations",
        path: "/dashboard/admin/organizations",
        pro: true,
      },
      { name: "All Orders", path: "/dashboard/admin/orders", pro: true },
      { name: "Admins", path: "/dashboard/admin/admins", pro: true },
    ],
  },
  {
    icon: (
      <SettingsIcon className="group-hover:text-brand-500 h-5 w-5 text-gray-400 transition-all duration-200 group-hover:scale-110" />
    ),
    name: "Account",
    path: "/dashboard/account",
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen } = useSidebar();
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {},
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prev) => {
      if (prev && prev.type === menuType && prev.index === index) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "others",
  ) => (
    <ul className="flex flex-col gap-1">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-gray-600 transition-all duration-200 hover:bg-gray-50/80 hover:shadow-sm dark:text-gray-300 dark:hover:bg-gray-800/80 ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "bg-gray-50/90 shadow-sm dark:bg-gray-800/90"
                  : ""
              }`}
            >
              <span
                className={`transition-all duration-200 ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "text-brand-500 scale-110"
                    : ""
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isMobileOpen) && (
                <span
                  className={`text-sm font-medium transition-all duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "text-brand-500"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {nav.name}
                </span>
              )}
              {(isExpanded || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto h-4 w-4 transition-all duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "text-brand-500 rotate-180"
                      : "text-gray-400"
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-gray-600 transition-all duration-200 hover:bg-gray-50/80 hover:shadow-sm dark:text-gray-300 dark:hover:bg-gray-800/80 ${
                  isActive(nav.path)
                    ? "bg-gray-50/90 shadow-sm dark:bg-gray-800/90"
                    : ""
                }`}
              >
                <span
                  className={`transition-all duration-200 ${
                    isActive(nav.path) ? "text-brand-500 scale-110" : ""
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isMobileOpen) && (
                  <span
                    className={`text-sm font-medium transition-all duration-200 ${
                      isActive(nav.path)
                        ? "text-brand-500"
                        : "text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {nav.name}
                  </span>
                )}
                {(isExpanded || isMobileOpen) && nav.pro && (
                  <span className="bg-brand-50 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400 ml-auto rounded-full px-2 py-0.5 text-xs font-medium">
                    PRO
                  </span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-200"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="relative mt-1.5 ml-9 space-y-1">
                <div className="absolute top-0 bottom-0 left-0 w-px bg-gray-200/50 dark:bg-gray-700/50" />
                {nav.subItems.map((subItem, subIndex) => (
                  <li key={subItem.name} className="relative">
                    <div className="absolute top-1/2 left-0 h-px w-3 -translate-y-1/2 bg-gray-200/50 dark:bg-gray-700/50" />
                    <Link
                      href={subItem.path}
                      className={`group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 transition-all duration-200 hover:bg-gray-50/80 hover:shadow-sm dark:text-gray-300 dark:hover:bg-gray-800/80 ${
                        isActive(subItem.path)
                          ? "bg-gray-50/90 shadow-sm dark:bg-gray-800/90"
                          : ""
                      }`}
                    >
                      <span
                        className={`text-sm font-medium transition-all duration-200 ${
                          isActive(subItem.path)
                            ? "text-brand-500"
                            : "text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        {subItem.name}
                      </span>
                      {subItem.pro && (
                        <span className="bg-brand-50 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400 ml-auto rounded-full px-2 py-0.5 text-xs font-medium">
                          PRO
                        </span>
                      )}
                      {subItem.new && (
                        <span className="ml-auto rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-600 dark:bg-green-500/20 dark:text-green-400">
                          NEW
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  useEffect(() => {
    Object.entries(subMenuRefs.current).forEach(([key, el]) => {
      if (el) {
        setSubMenuHeight((prev) => ({ ...prev, [key]: el.scrollHeight }));
      }
    });
  }, [isExpanded, isMobileOpen]);

  return (
    <aside
      className={`h-full w-64 border-r border-gray-200 bg-white shadow-sm transition-all duration-200 dark:border-gray-800 dark:bg-gray-900 ${
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-gray-200 px-4 dark:border-gray-800">
          <Link href="/dashboard" className="flex items-center">
            <Image
              src="/images/logo/logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-6 px-3 py-4">
          <div>
            <h3 className="mb-2 px-3 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
              Menu
            </h3>
            {renderMenuItems(navItems, "main")}
          </div>

          <div>
            <h3 className="mb-2 px-3 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
              Others
            </h3>
            {renderMenuItems(othersItems, "others")}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
