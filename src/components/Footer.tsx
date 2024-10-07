import Link from "next/link";
import React from "react";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
type Props = {};

export default function Footer({}: Props) {
  return (
    <div className="footer bg-[#0F0F0F] p-[13px] pt-[50px] md:p-[7%]">
      <div className="flex flex-wrap md:flex-nowrap">
        <div className="mb-[30px] w-[50%]">
          <h4 className="mb-[16px] text-[16px] text-[#FFFFFF] lg:mb-[24px] lg:text-[20px]">
            Home
          </h4>
          <div className="links-sec flex flex-col leading-7">
            <Link
              className="text-[14px] text-[#999999]"
              href={"/media/categories"}
            >
              Categories
            </Link>
            <Link
              className="text-[14px] text-[#999999]"
              href={"/#platforms-section"}
            >
              Devices
            </Link>
            <Link
              className="text-[14px] text-[#999999]"
              href={"/#pricing-section"}
            >
              Pricing
            </Link>
            <Link className="text-[14px] text-[#999999]" href={"/#faq-secion"}>
              FAQ
            </Link>
          </div>
        </div>
        <div className="w-[50%]">
          <h4 className="mb-[16px] text-[16px] text-[#FFFFFF] lg:mb-[24px] lg:text-[20px]">
            Movies
          </h4>
          <div className="flex flex-col leading-7">
            <Link
              className="text-[14px] text-[#999999]"
              href={"/media/categories/#movies-genres"}
            >
              Gernes
            </Link>
            <Link
              className="text-[14px] text-[#999999]"
              href={"/media/categories/#movies-trending"}
            >
              Trending
            </Link>
            <Link
              className="text-[14px] text-[#999999]"
              href={"/media/categories/#movies-top-rated"}
            >
              Top Rated
            </Link>
            <Link
              className="text-[14px] text-[#999999]"
              href={"/media/categories/#movies-popular"}
            >
              Popular
            </Link>
          </div>
        </div>
        <div className="mb-[30px] w-[50%]">
          <h4 className="mb-[16px] text-[16px] text-[#FFFFFF] lg:mb-[24px] lg:text-[20px]">
            Shows
          </h4>
          <div className="flex flex-col leading-7">
            <Link
              className="text-[14px] text-[#999999]"
              href={"/media/categories/#shows-genres"}
            >
              Gernes
            </Link>
            <Link
              className="text-[14px] text-[#999999]"
              href={"/media/categories/#shows-trending"}
            >
              Trending
            </Link>
            <Link
              className="text-[14px] text-[#999999]"
              href={"/media/categories/#shows-top-rated"}
            >
              Top Rated
            </Link>
            <Link
              className="text-[14px] text-[#999999]"
              href={"/media/categories/#shows-popular"}
            >
              Popular
            </Link>
          </div>
        </div>
        <div className="w-[50%]">
          <h4 className="mb-[16px] text-[16px] text-[#FFFFFF] lg:mb-[24px] lg:text-[20px]">
            Support
          </h4>
          <Link className="text-[14px] text-[#999999]" href={"/support"}>
            Contact Us
          </Link>
        </div>
        <div className="mb-[30px] w-[50%]">
          <h4 className="mb-[16px] text-[16px] text-[#FFFFFF] lg:mb-[24px] lg:text-[20px]">
            Subscription
          </h4>
          <div className="flex flex-col leading-7">
            <Link
              className="text-[14px] text-[#999999]"
              href={"/subscriptions"}
            >
              Plans
            </Link>
            <Link
              className="text-[14px] text-[#999999]"
              href={"/subscriptions"}
            >
              Features
            </Link>
          </div>
        </div>
        <div>
          <h4 className="mb-[16px] text-[16px] text-[#FFFFFF] lg:text-[20px]">
            Connect With Us
          </h4>
          <div className="mt-[5px] flex">
            <a
              href={"https://www.facebook.com/"}
              target={"_blank"}
              className="mr-[10px] rounded-lg bg-[#1A1A1A]"
            >
              <CiFacebook className="p-1 text-3xl text-[#FFFFFF]" />
            </a>
            <a
              href={"https://www.instagram.com/"}
              target={"_blank"}
              className="mr-[10px] rounded-lg bg-[#1A1A1A]"
            >
              <FaInstagram className="p-1 text-3xl text-[#FFFFFF]" />
            </a>
            <a
              href={"https://www.twitter.com/"}
              target={"_blank"}
              className="mr-[10px] rounded-lg bg-[#1A1A1A]"
            >
              <CiTwitter className="p-1 text-3xl text-[#FFFFFF]" />
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto mb-[20px] w-[100%] border-2 border-b-0 border-l-0 border-r-0 border-t-[#262626] lg:mb-[30px] lg:mt-[100px] lg:w-[100%]"></div>
      <div className="items-center justify-between md:mx-auto md:flex md:w-[100%]">
        <div>
          <p className="mb-[20px] text-[14px] text-[#999999] md:mb-0">
            @2023 PopcornTv, All Rights Reserved
          </p>
        </div>
        <div className="flex items-center">
          <Link className="mr-4 text-[14px] text-[#999999]" href={""}>
            Terms of Use
          </Link>
          <Link
            className="mr-4 border-2 border-b-0 border-t-0 border-l-[#262626] border-r-[#262626] pl-3 pr-4 text-[14px] text-[#999999]"
            href={""}
          >
            Privacy Policy
          </Link>
          <Link className="text-[14px] text-[#999999]" href={""}>
            Cookie Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
