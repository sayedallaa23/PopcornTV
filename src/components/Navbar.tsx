"use client";
import Link from "next/link";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";
import { PiPopcornBold } from "react-icons/pi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { log } from "console";

type Props = {};
export default function Navbar({}: Props) {
  const pathname = usePathname();

  return (
    <div className="relative z-10 flex items-center justify-between bg-transparent p-[15px] text-sm text-[#BFBFBF] sm:text-xl md:p-[15px] lg:ml-[3rem]">
      <Link href={"/"}>
        <div className="flex items-center justify-between">
          <PiPopcornBold className="mr-1 text-2xl text-[#E50000] sm:text-5xl" />
          PopcornTV
        </div>
      </Link>
      <div className="hidden items-center justify-between rounded-[15px] border-[5px] border-[#1A1A1A] bg-[#141414] lg:flex">
        <div className="lg:p-2">
          <Link
            href={"/"}
            className={`rounded-[10px] pr-5 hover:bg-[#1A1A1A] focus:bg-[#1A1A1A] focus:text-white sm:block md:pr-10 lg:p-3 ${pathname == "/" ? "bg-[#1A1A1A]" : ""}`}
          >
            Home
          </Link>
        </div>
        <div className="flex items-center justify-center text-center lg:p-2">
          <Link
            href={"/media/categories"}
            className={`rounded-[10px] pr-5 hover:bg-[#1A1A1A] focus:bg-[#1A1A1A] focus:text-white md:pr-10 lg:p-3 ${pathname == "/media/categories" ? "bg-[#1A1A1A]" : ""}`}
          >
            Movies & Shows
          </Link>
        </div>
        <div className="lg:p-2">
          <Link
            href={"/support"}
            className={`rounded-[10px] pr-5 hover:bg-[#1A1A1A] focus:bg-[#1A1A1A] focus:text-white md:pr-10 lg:p-3 ${pathname == "/support" ? "bg-[#1A1A1A]" : ""}`}
          >
            Support
          </Link>
        </div>
        <div className="lg:p-2">
          <Link
            href={"/subscriptions"}
            className={`rounded-[10px] hover:bg-[#1A1A1A] focus:bg-[#1A1A1A] focus:text-white lg:p-3 ${pathname == "/subscriptions" ? "bg-[#1A1A1A]" : ""}`}
          >
            Subscriptions
          </Link>
        </div>
      </div>
      <div className="hidden sm:mr-[3rem] lg:flex">
        <Link href={""} className="">
          <CiSearch className="sm:mr-[1.5rem] sm:text-5xl" />
        </Link>
        <Link href={""}>
          <CiBellOn className="sm:text-5xl" />
        </Link>
      </div>
      <div className="rounded-[10px] border-[2px] border-[#262626] bg-[#1A1A1A] p-2 lg:hidden">
        <HiOutlineMenuAlt3 />
      </div>
    </div>
  );
}
