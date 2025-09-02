"use client";

import Image from "next/image";
import { buttonVariants } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Header = () => {
  const ROUTES = [
    { name: "تتبع الملاحظة", href: "/track" },
    { name: "من نحن", href: "#about-us" },
    { name: "اتصل بنا", href: "#contact-us" },
    { name: "لوحة التحكم", href: "/admin" },
  ];

  return (
    <header className="max-container">
      <nav className="bg-transparent border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto">
          <Link href="/" className="flex items-center">
            <Image src={"/logo.svg"} width={152} height={56} alt="logo" />
          </Link>

          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {ROUTES.map((route) => (
                <Link
                  href={route.href}
                  key={route.href}
                  className="block py-2 pr-4 pl-3 text-gray-600 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0"
                >
                  {route.name}
                </Link>
              ))}
            </ul>
          </div>
          <div className="flex items-center lg:order-2">
            <Link
              href="/submit"
              className={cn(buttonVariants(), "hidden sm:inline-flex")}
            >
              انشاء ملاحظة
              <ArrowLeft className="ml-1" />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
