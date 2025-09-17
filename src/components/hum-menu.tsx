"use client";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

interface NavItem {
  "nav-name": { title: string; url: string; target?: string };
}

interface HumMenuProps {
  navContent: NavItem[];
}

export default function HumMenu({ navContent }: HumMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden p-2 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
        aria-label="Open navigation menu"
        onClick={() => setOpen(true)}
      >
        <div className="w-5 h-5 flex flex-col justify-center space-y-1">
          <div className="w-full h-0.5 bg-foreground/80 rounded"></div>
          <div className="w-full h-0.5 bg-foreground/80 rounded"></div>
          <div className="w-full h-0.5 bg-foreground/80 rounded"></div>
        </div>
      </button>
      {typeof window !== "undefined" &&
        createPortal(
          <>
            {/* Overlay */}
            {open && (
              <div
                className="fixed inset-0 z-[1000] bg-black/40 backdrop-blur-sm transition-opacity duration-300"
                onClick={() => setOpen(false)}
                aria-label="Close navigation menu"
              />
            )}
            {/* Side Drawer with smooth transition */}
            <aside
              className={`fixed top-0 right-0 z-[1001] h-full w-64 bg-background shadow-lg border-l border-border/40 transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}
              style={{ willChange: "transform" }}
              tabIndex={-1}
              aria-modal="true"
              role="dialog"
            >
              <div className="flex items-center justify-between px-4 py-4 border-b border-border/30">
                <span className="text-lg font-semibold">Menu</span>
                <button
                  className="p-2 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="text-foreground"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <nav className="flex flex-col p-4 space-y-2">
                {Array.isArray(navContent) &&
                  navContent.map((item, index) => (
                    <Link
                      key={index}
                      href={item["nav-name"].url}
                      className="px-4 py-2 text-base font-medium text-foreground/90 hover:text-primary hover:bg-accent/50 rounded-lg transition-all duration-200"
                      target={item["nav-name"].target || undefined}
                      onClick={() => setOpen(false)}
                    >
                      {item["nav-name"].title}
                    </Link>
                  ))}
              </nav>
            </aside>
          </>,
          document.body
        )}
    </>
  );
}
