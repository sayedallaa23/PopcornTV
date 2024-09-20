import React, { useState } from "react";
import Link from "next/link";
import PriceCard from "./PriceCard";
type Props = {};

const Pricing = (props: Props) => {
  const [monthly, setMonthly] = useState(true);
  const [yearly, setYearly] = useState(false);
  return (
    <div className="mx-auto mb-[4rem] w-[92%] md:w-[84%]">
      <div className="flex flex-col justify-between sm:mb-[50px] md:flex-row">
        <div className="ml-[9px]">
          <h3 className="text-[24px] text-white md:text-[28px] lg:text-[38px]">
            Choose the plan that&apos;s right for you
          </h3>
          <p className="mb-[20px] w-[90%] text-[14px] text-[#999999] md:text-[16px] lg:text-[18px]">
            Join PopcornTv and select from our flexible subscription options
            tailored to suit your viewing preferences. Get ready for non-stop
            entertainment!
          </p>
        </div>
        <div className="mb-[50px] flex h-[50px] w-fit items-center rounded-[10px] border-[2px] border-[#1A1A1A] bg-[#141414] text-[#BFBFBF] md:mb-[80px] md:h-[80px]">
          <div className="p-0 lg:p-2">
            <button
              className={`mx-2 rounded-[10px] p-[8px] hover:bg-[#1A1A1A] focus:bg-[#1A1A1A] focus:text-white md:p-3 xl:p-4 ${monthly ? "bg-[#1A1A1A]" : ""}`}
              onClick={() => {
                setMonthly(true);
                setYearly(false);
              }}
            >
              Monthly
            </button>
          </div>
          <div className="p-0 lg:p-2">
            <button
              className={`mx-2 rounded-[10px] p-[8px] hover:bg-[#1A1A1A] focus:bg-[#1A1A1A] focus:text-white md:p-3 xl:p-4 ${yearly ? "bg-[#1A1A1A]" : ""}`}
              onClick={() => {
                setMonthly(false);
                setYearly(true);
              }}
            >
              Yearly
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto flex flex-col lg:flex-row lg:justify-between">
        <PriceCard
          plan="Basic Plan"
          price={monthly ? 9.99 : 80.99}
          description="Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles."
          period={monthly ? "month" : "year"}
        />
        <PriceCard
          plan="Standard Plan"
          price={monthly ? 12.99 : 100.99}
          description="Access to a wider selection of movies and shows, including most new releases and exclusive content"
          period={monthly ? "month" : "year"}
        />
        <PriceCard
          plan="Premium Plan"
          price={monthly ? 14.99 : 120.99}
          description="Access to a widest selection of movies and shows, including all new releases and exclusive content and Offline Viewing"
          period={monthly ? "month" : "year"}
        />
      </div>
    </div>
  );
};

export default Pricing;
