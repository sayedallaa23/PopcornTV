import React from "react";

type Props = { plan: string; description: string; price: number ; period:string };

export default function PriceCard({ plan, description, price,period }: Props) {
  return (
    <div className="mb-[20px] rounded-[10px] border-[1px] border-[#262626] bg-[#1A1A1A] p-[25px] lg:w-[32%] md:w-[98%] md:py-[30px] mx-auto">
      <h3 className="mb-[10px] text-[18px] text-white md:mb-[16px] md:text-[24px]">
        {plan}
      </h3>
      <p className="text-[14px] text-[#999999] md:text-[18px]">{description}</p>
      <div className="my-[30px] flex md:my-[20px]">
        <h3 className="text-[18px] text-white md:text-[24px]">
          <span>$</span>
          <span>{price}</span>
        </h3>
        <p className="self-end text-[14px] text-[#999999] md:text-[18px]">
          /{period}
        </p>
      </div>
      <div className="mt-[30px] flex justify-center text-[10px] lg:text-[13px]">
        <button className="mx-auto flex h-[50px] w-[45%] items-center justify-center rounded-md border-[2px] border-[#262626] bg-[#141414] p-3 text-white ">
          Start Free Trial
        </button>
        <button className="mx-auto flex h-[50px] w-[45%] items-center justify-center rounded-md bg-[#E50000] p-3 text-white ">
          Choose Plan
        </button>
      </div>
    </div>
  );
}
