"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathName = usePathname();
  return (
    <nav className="sm:fixed sm:block  sm:w-[15%] sm:h-screen sm:border-r sm:px-4 sm:py-5 absolute bottom-0 w-full px-3 h-12 flex items-center shadow-black shadow-md sm:shadow-none ">
      <div className="hidden sm:block">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width="80"
          height="80"
        />
      </div>
      <ul className="sm:py-5 text-xs w-full flex sm:flex-col justify-between sm:justify-normal gap-y-3 sm:border-b">
        <Link
          href="/dashboard"
          className={`flex items-center gap-x-3 p-2 ${
            pathName == "/dashboard" ? "bg-[#d5dbe79b] rounded-md" : ""
          }`}
        >
          <Image
            src="/assets/images/icon-home.svg"
            alt="logo"
            width="20"
            height="20"
          />

          <span className="hidden sm:inline">All Notes</span>
        </Link>
        <Link
          href="/dashboard/archive"
          className={`flex items-center gap-x-3 p-2 ${
            pathName == "/dashboard/archive" ? "bg-[#E0E4EA]" : ""
          }`}
        >
          <Image
            src="/assets/images/icon-archive.svg"
            alt="logo"
            width="20"
            height="20"
          />

          <span className="hidden sm:inline">Archived Notes</span>
        </Link>
        <Link
          href="/dashboard/archive"
          className={`flex sm:hidden items-center gap-x-3 p-2 ${
            pathName == "/dashboard/archive" ? "bg-[#E0E4EA]" : ""
          }`}
        >
          <Image
            src="/assets/images/icon-search.svg"
            alt="logo"
            width="20"
            height="20"
          />

          <span className="hidden sm:inline">Archived Notes</span>
        </Link>
        <Link
          href="/dashboard/archive"
          className={`flex sm:hidden items-center gap-x-3 p-2 ${
            pathName == "/dashboard/archive" ? "bg-[#E0E4EA]" : ""
          }`}
        >
          <Image
            src="/assets/images/icon-tag.svg"
            alt="logo"
            width="20"
            height="20"
          />

          <span className="hidden sm:inline">Archived Notes</span>
        </Link>
        <Link
          href="/dashboard/archive"
          className={`flex sm:hidden items-center gap-x-3 p-2 ${
            pathName == "/dashboard/archive" ? "bg-[#E0E4EA]" : ""
          }`}
        >
          <Image
            src="/assets/images/icon-settings.svg"
            alt="logo"
            width="20"
            height="20"
          />

          <span className="hidden sm:inline">Archived Notes</span>
        </Link>
      </ul>
    </nav>
  );
}
