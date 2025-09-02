"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowLeft } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const ROUTES = [
    { name: "تتبع الملاحظة", href: "/track" },
    { name: "من نحن", href: "#about-us" },
    { name: "اتصل بنا", href: "#contact-us" },
    { name: "لوحة التحكم", href: "/admin" },
  ];

  return (
    <header className="max-container">
      <nav className="bg-transparent border-b border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto">
          <Link href="/" className="flex items-center">
            <Image src={"/logo.svg"} width={152} height={56} alt="logo" />
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-primary-600 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            {ROUTES.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="text-gray-600 hover:text-primary-600 transition font-medium"
              >
                {route.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:inline-flex lg:order-2">
            <Link href="/submit" className={cn(buttonVariants())}>
              انشاء ملاحظة
              <ArrowLeft className="ml-1" />
            </Link>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden mt-4 space-y-2">
            {ROUTES.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 hover:text-primary-600 px-2 py-2 rounded transition font-medium"
              >
                {route.name}
              </Link>
            ))}
            <Link
              href="/submit"
              className={cn(
                buttonVariants({}),
                "w-full justify-center flex mt-2"
              )}
              onClick={() => setIsOpen(false)}
            >
              انشاء ملاحظة
              <ArrowLeft className="ml-1" />
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
