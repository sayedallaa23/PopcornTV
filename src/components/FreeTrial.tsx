import React from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {};

const FreeTrial = (props: Props) => {
  return (
    <div className="relative mx-auto mb-[20%] h-[40vh] w-[90%] md:mb-[10%] md:w-[84%] lg:mb-[8%] lg:h-[344px]">
      <Image
        src={"/images/freetrial.png"}
        width={1280}
        height={355}
        alt=""
        className="relative mx-auto h-[100%] w-[100%] rounded-[12px] border-[2px] border-[#262626] object-cover lg:rounded-[8px]"
      />
      <div className="absolute top-[15%] h-[100%] w-[100%] items-center justify-between text-center lg:right-12 lg:flex">
        <div className="md:mx-[7%]">
          <h2 className="mb-[10px] text-[28px] text-white lg:text-start lg:text-[48px]">
            Start your free trial today!
          </h2>
          <p className="mb-[15%] text-[14px] leading-6 text-[#999999] md:mt-4">
            This is a clear and concise call to action that encourages users to
            sign up for a free trial of StreamVibe.
          </p>
        </div>
        <Link href={"/subscriptions"}>
          <button className="mx-auto my-auto flex items-center justify-center rounded-md bg-[#E50000] p-3 text-white lg:mb-[40%]">
          Choose Your Plan
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FreeTrial;
