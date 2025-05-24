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
      <GridIcon className="group-hover:text-brand-500 h-6 w-6 text-gray-500 transition-colors" />
    ),
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: (
      <BuildingIcon className="group-hover:text-brand-500 h-6 w-6 text-gray-500 transition-colors" />
    ),
    name: "Organization",
    subItems: [
      { name: "Settings", path: "/dashboard/organization", pro: true },
      { name: "Courier Credentials", path: "/dashboard/couriers", pro: true },
    ],
  },
  {
    icon: (
      <ShoppingBagIcon className="group-hover:text-brand-500 h-6 w-6 text-gray-500 transition-colors" />
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
      <UsersIcon className="group-hover:text-brand-500 h-6 w-6 text-gray-500 transition-colors" />
    ),
    name: "Employees",
    path: "/dashboard/employees",
    pro: true,
  },
  {
    icon: (
      <ChartIcon className="group-hover:text-brand-500 h-6 w-6 text-gray-500 transition-colors" />
    ),
    name: "Analytics",
    path: "/dashboard/analytics",
  },
];

const othersItems: NavItem[] = [
  {
    icon: (
      <CreditCardIcon className="group-hover:text-brand-500 h-6 w-6 text-gray-500 transition-colors" />
    ),
    name: "Subscription",
    path: "/dashboard/subscription",
    pro: true,
  },
  {
    icon: (
      <BoxCubeIcon className="group-hover:text-brand-500 h-6 w-6 text-gray-500 transition-colors" />
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
      <SettingsIcon className="group-hover:text-brand-500 h-6 w-6 text-gray-500 transition-colors" />
    ),
    name: "Account",
    path: "/dashboard/account",
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
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
    <ul className="flex flex-col gap-2">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-700 transition-all duration-300 hover:bg-gray-100/80 hover:shadow-sm dark:text-gray-200 dark:hover:bg-gray-800/80 ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "bg-gray-100/90 shadow-sm dark:bg-gray-800/90"
                  : ""
              }`}
            >
              <span
                className={`transition-all duration-300 ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "text-brand-500 scale-110"
                    : "group-hover:text-brand-500 text-gray-500 group-hover:scale-110"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span
                  className={`group-hover:text-brand-500 text-sm font-medium transition-all duration-300`}
                >
                  {nav.name}
                </span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto h-4 w-4 transition-all duration-300 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "text-brand-500 rotate-180"
                      : "group-hover:text-brand-500 text-gray-400"
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-700 transition-all duration-300 hover:bg-gray-100/80 hover:shadow-sm dark:text-gray-200 dark:hover:bg-gray-800/80 ${
                  isActive(nav.path)
                    ? "bg-gray-100/90 shadow-sm dark:bg-gray-800/90"
                    : ""
                }`}
              >
                <span
                  className={`transition-all duration-300 ${
                    isActive(nav.path)
                      ? "text-brand-500 scale-110"
                      : "group-hover:text-brand-500 text-gray-500 group-hover:scale-110"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span
                    className={`group-hover:text-brand-500 text-sm font-medium transition-all duration-300`}
                  >
                    {nav.name}
                  </span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="relative mt-2 ml-9 space-y-2">
                {/* Vertical line */}
                <div className="absolute top-0 bottom-0 left-0 w-px bg-gray-200/50 dark:bg-gray-700/50" />

                {nav.subItems.map((subItem, subIndex) => (
                  <li key={subItem.name} className="relative">
                    {/* Horizontal line */}
                    <div className="absolute top-1/2 left-0 h-px w-3 -translate-y-1/2 bg-gray-200/50 dark:bg-gray-700/50" />

                    <Link
                      href={subItem.path}
                      className={`flex items-center rounded-lg px-4 py-2.5 text-sm transition-all duration-300 ${
                        isActive(subItem.path)
                          ? "bg-brand-50/90 text-brand-500 dark:bg-brand-500/10 shadow-sm"
                          : "hover:text-brand-500 text-gray-600 hover:bg-gray-50/80 hover:shadow-sm dark:text-gray-400 dark:hover:bg-gray-800/50"
                      }`}
                    >
                      {/* Dot indicator */}
                      <div
                        className={`absolute top-1/2 left-[-0.5px] h-1.5 w-1.5 -translate-y-1/2 rounded-full ${
                          isActive(subItem.path)
                            ? "bg-brand-500"
                            : "bg-gray-300 dark:bg-gray-600"
                        }`}
                      />

                      <span className="ml-2">{subItem.name}</span>
                      <span className="ml-auto flex items-center gap-2">
                        {subItem.new && (
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all duration-300 ${
                              isActive(subItem.path)
                                ? "bg-brand-100/90 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400 shadow-sm"
                                : "bg-gray-100/80 text-gray-600 shadow-sm dark:bg-gray-800/80 dark:text-gray-400"
                            }`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all duration-300 ${
                              isActive(subItem.path)
                                ? "bg-brand-100/90 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400 shadow-sm"
                                : "bg-gray-100/80 text-gray-600 shadow-sm dark:bg-gray-800/80 dark:text-gray-400"
                            }`}
                          >
                            pro
                          </span>
                        )}
                      </span>
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
  }, [isExpanded, isHovered, isMobileOpen]);

  return (
    <aside
      className={`fixed top-0 left-0 z-30 flex min-h-screen flex-col overflow-y-hidden border-r border-gray-200 bg-white shadow-xl duration-300 ease-linear lg:static lg:translate-x-0 lg:shadow-none dark:border-gray-800 dark:bg-gray-900 ${
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      } ${isExpanded || isHovered || isMobileOpen ? "lg:w-70" : "lg:w-20"} `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-center gap-2 border-b border-gray-200 px-4 py-3 lg:px-6 dark:border-gray-800">
        {isExpanded || isHovered || isMobileOpen ? (
          <Link className="flex-shrink-0" href="/">
            <Image
              width={154}
              height={32}
              className="dark:hidden"
              src="/images/logo/logo.png"
              alt="Logo"
            />
            <Image
              width={154}
              height={32}
              className="hidden dark:block"
              src="/images/logo/logo-dark.svg"
              alt="Logo"
            />
          </Link>
        ) : (
          <Link className="flex-shrink-0" href="/">
            <Image
              width={32}
              height={32}
              src="/images/logo/favicon.svg"
              alt="Logo"
            />
          </Link>
        )}
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto p-4 duration-300 ease-linear md:p-6">
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-400">
              MENU
            </h3>
            {renderMenuItems(navItems, "main")}
          </div>

          <div className="mt-8">
            <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-400">
              OTHERS
            </h3>
            {renderMenuItems(othersItems, "others")}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
