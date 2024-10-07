"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";
import { PiPopcornBold } from "react-icons/pi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { log } from "console";
import { FaXmark } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { Authcontext } from "@/store/AuthContext";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { signOut, getAuth } from "firebase/auth";
import { auth } from "../store/firebase";

type Props = {};
export default function Navbar({}: Props) {
  const authContext = React.useContext(Authcontext);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const hamref = React.useRef(null);
  const searchref = React.useRef(null);
  const pathname = usePathname();
  function handleHamMenu() {
    if ((hamref.current as any).style.display === "block") {
      (hamref.current as any).style.display = "none";
    } else {
      (hamref.current as any).style.display = "block";
    }
  }

  const signout2 = () => {
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="relative z-10 flex items-center justify-between bg-transparent p-[15px] text-sm text-[#BFBFBF] sm:text-xl md:p-[15px] lg:ml-[3rem]">
      <Link href={"/"}>
        <div className="flex items-center justify-between">
          <PiPopcornBold className="mr-1 text-2xl text-[#E50000] sm:text-5xl" />
          PopcornTV
        </div>
      </Link>
      <div className="hidden items-center justify-between rounded-[15px] border-[5px] border-[#1A1A1A] bg-[#141414] p-[2px] text-[12px] lg:flex">
        <div className="lg:p-">
          <Link
            href={"/"}
            className={`m-[5px] rounded-[10px] hover:bg-[#1A1A1A] focus:bg-[#1A1A1A] focus:text-white sm:block lg:p-2 ${pathname == "/" ? "bg-[#1A1A1A]" : ""}`}
          >
            Home
          </Link>
        </div>
        <div className="lg:p-">
          <Link
            href={"/media/categories"}
            className={`m-[5px] rounded-[10px] hover:bg-[#1A1A1A] focus:bg-[#1A1A1A] focus:text-white md:pr-10 lg:p-3 ${pathname == "/media/categories" ? "bg-[#1A1A1A]" : ""}`}
          >
            Movies & Shows
          </Link>
        </div>
        <div className="lg:p-">
          <Link
            href={"/support"}
            className={`m-[5px] rounded-[10px] hover:bg-[#1A1A1A] focus:bg-[#1A1A1A] focus:text-white md:pr-10 lg:p-3 ${pathname == "/support" ? "bg-[#1A1A1A]" : ""}`}
          >
            Support
          </Link>
        </div>
        <div className="lg:p-">
          <Link
            href={"/subscriptions"}
            className={`m-[5px] rounded-[10px] hover:bg-[#1A1A1A] focus:bg-[#1A1A1A] focus:text-white lg:p-3 ${pathname == "/subscriptions" ? "bg-[#1A1A1A]" : ""}`}
          >
            Subscriptions
          </Link>
        </div>
      </div>
      <div className="hidden items-center sm:mr-[3rem] lg:flex">
        <input
          type="text"
          name="search-input"
          id=""
          className="absolute right-[10rem] hidden h-[20px] w-[10vw] rounded-md bg-[#d8d5d5] p-2 text-[10px] text-black lg:block"
          placeholder="Search"
          ref={searchref}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const queryString = new URLSearchParams({
                q: searchQuery,
              }).toString();
              router.push(`/search?${queryString}`);
              router.refresh();
            }
          }}
        />

        <CiSearch
          className="cursor-pointer sm:text-3xl"
          onClick={() => {
            const queryString = new URLSearchParams({
              q: searchQuery,
            }).toString();
            router.push(`/search?${queryString}`);
            router.refresh();
          }}
        />
        <Link href={authContext?.isSignin?"/profile":"/login"}>
          <CiBellOn className="sm:text-3xl" />
        </Link>
        {authContext?.isSignin && (
          <LiaSignOutAltSolid
            className="cursor-pointer sm:text-3xl"
            onClick={signout2}
          />
        )}
      </div>
      <div className="rounded-[10px] border-[2px] border-[#262626] bg-[#1A1A1A] p-2 lg:hidden">
        <HiOutlineMenuAlt3
          onClick={() => {
            handleHamMenu();
          }}
        />
      </div>
      <div
        className="ham-menu fixed left-0 top-0 z-50 hidden h-[100vh] w-[100vw] bg-[#1A1A1A]"
        ref={hamref}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <div className="search">
            <input
              type="text"
              name="search-input"
              id=""
              className="h-[4vh] w-[70vw] rounded-md bg-[#d8d5d5] p-2 text-black"
              placeholder="Search"
            />
          </div>
          <FaXmark
            className="text-[30px] text-white"
            onClick={() => {
              handleHamMenu();
            }}
          />
        </div>
        <div className="links flex flex-col px-5 my-7">
          <Link
            href={"/"}
            className="py-2 text-[#BFBFBF]"
            onClick={() => {
              handleHamMenu();
            }}
          >
            Home
          </Link>
          <Link
            href={"/media/categories"}
            className="py-2 text-[#BFBFBF]"
            onClick={() => {
              handleHamMenu();
            }}
          >
            Movies & Shows
          </Link>
          <Link
            href={"/support"}
            className="py-2 text-[#BFBFBF]"
            onClick={() => {
              handleHamMenu();
            }}
          >
            Support
          </Link>
          <Link
            href={"/subscriptions"}
            className="py-2 text-[#BFBFBF]"
            onClick={() => {
              handleHamMenu();
            }}
          >
            Subscriptions
          </Link>
          <Link href={authContext?.isSignin?"/profile":"/login"} className="py-2 text-[#BFBFBF]">
            Profile
          </Link>
          {authContext?.isSignin&&
          <Link href={"/"} className="py-2 text-[#BFBFBF]" onClick={()=>{signout2;handleHamMenu()}}>
            Sign out
          </Link>}
        </div>
      </div>
    </div>
  );
}
