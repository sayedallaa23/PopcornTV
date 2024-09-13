import React, { useState } from "react";
import Link from "next/link";
import PriceCard from "./PriceCard";
type Props = {};

const Pricing = (props: Props) => {
  const [monthly,setMonthly] = useState(true)
  const [yearly,setYearly] = useState(false)
  return (
    <div className="w-[92%] mx-auto md:w-[84%] mb-[4rem]">
      <div className="flex flex-col md:flex-row justify-between sm:mb-[50px]">
        <div className="ml-[9px]">
          <h3 className="text-[24px] text-white md:text-[28px] lg:text-[38px]">
            Choose the plan that's right for you
          </h3>
          <p className="w-[90%] text-[14px] text-[#999999] md:text-[16px] lg:text-[18px] mb-[20px]">
            Join StreamVibe and select from our flexible subscription options
            tailored to suit your viewing preferences. Get ready for non-stop
            entertainment!
          </p>
        </div>
        <div className="flex h-[50px] w-fit items-center rounded-[10px] border-[2px] border-[#1A1A1A] bg-[#141414] text-[#BFBFBF] md:h-[80px] mb-[50px] md:mb-[80px]">
          <div className="p-0 lg:p-2">
            <button className={`mx-2  rounded-[10px] p-[8px] hover:bg-[#1A1A1A] focus:bg-[#1A1A1A] focus:text-white md:p-3 xl:p-4 ${monthly?"bg-[#1A1A1A]":""}`}
            onClick={()=>{
              setMonthly(true)
              setYearly(false)
            }}
            >
              Monthly
            </button>
          </div>
          <div className="p-0 lg:p-2">
            <button className={`mx-2  rounded-[10px] p-[8px] hover:bg-[#1A1A1A] focus:bg-[#1A1A1A] focus:text-white md:p-3 xl:p-4 ${yearly?"bg-[#1A1A1A]":""}`}
            onClick={()=>{
              setMonthly(false)
              setYearly(true)
            }}
            >
              Yearly
            </button>
          </div>
        </div>
      </div>
      <div className="flex-col flex lg:flex-row lg:justify-between mx-auto">
        <PriceCard
          plan="Basic Plan"
          price={monthly?9.99:80.99}
          description="Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles."
          period = {monthly?"month":"year"}
        />
        <PriceCard
          plan="Standard Plan"
          price={monthly?12.99:100.99}
          description="Access to a wider selection of movies and shows, including most new releases and exclusive content"
          period = {monthly?"month":"year"}
        />
        <PriceCard
          plan="Premium Plan"
          price={monthly?14.99:100.99}
          description="Access to a widest selection of movies and shows, including all new releases and exclusive content and Offline Viewing"
          period = {monthly?"month":"year"}
        />
      </div>
    </div>
  );
};

export default Pricing;
