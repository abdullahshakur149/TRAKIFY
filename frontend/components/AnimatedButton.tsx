import React from "react";
import Link from "next/link";

interface AnimatedButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  href,
  children,
  className = "",
  icon,
}) => {
  return (
    <Link
      href={href}
      className={`group hover:shadow-brand-500/20 relative inline-flex transform items-center justify-center overflow-hidden rounded-lg px-8 py-4 font-medium tracking-wide text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg ${className}`}
    >
      {/* Animated border */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="from-brand-500 via-brand-400 to-brand-500 animate-gradient-x absolute inset-0 bg-gradient-to-r opacity-90" />
        <div className="absolute inset-[2px] rounded-lg bg-gray-900 dark:bg-gray-800" />
      </div>

      {/* Glow effect */}
      <div className="from-brand-500 to-brand-400 absolute -inset-1 bg-gradient-to-r opacity-0 blur transition-opacity duration-300 group-hover:opacity-20" />

      {/* Content */}
      <div className="relative flex items-center gap-3">
        {icon && (
          <span className="transition-transform duration-300 group-hover:scale-110">
            {icon}
          </span>
        )}
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          {children}
        </span>
        <svg
          className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </div>
    </Link>
  );
};

export default AnimatedButton;
