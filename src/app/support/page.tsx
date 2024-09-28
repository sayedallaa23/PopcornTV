"use client";

import React, { useState } from "react";
import Image from "next/image";
// import "react-phone-number-input/style.css";
// import PhoneInput from "react-phone-number-input";
import Faq from "@/components/Faq";
// sssssssss
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
type Props = {};

function Page({}: Props) {
  const [value, setValue] = useState();

  return (
    <div className="mx-auto w-[90%] text-white md:w-[84%]">
      <div className="top-sec flex flex-col justify-between lg:flex-row mt-[10%]">
        <div className="left lg:w-[40%]">
          <h3 className="text-[24px] text-white md:text-[28px] lg:text-[34px] mb-2">
            Welcome to our support page!
          </h3>
          <p className="text-[14px] text-[#999999] md:text-[16px] lg:text-[18px] mb-2">
            We're here to help you with any problems you may be having with our
            product.
          </p>
          <Image
            src={"/images/support-img.png"}
            width={500}
            height={500}
            alt=""
            className="border-[2px] border-[#1A1A1A] object-cover"
          />
        </div>
        <div className="right border-[2px] border-[#1A1A1A] bg-[#0F0F0F] p-9 lg:w-[58%] mt-[10%] lg:mt-0">
          <form action="">
            <div className="names flex flex-col justify-between lg:flex-row">
              <div className="fname">
                <div>
                  <label className="">First Name</label>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Enter First Name"
                    className="my-2 border-[2px] border-[#1A1A1A] bg-[#141414]"
                  />
                </div>
              </div>
              <div className="lname">
                <div>
                  <label className="">Last Name</label>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    className="my-2 border-[2px] border-[#1A1A1A] bg-[#141414]"
                  />
                </div>
              </div>
            </div>
            <div className="contacts flex flex-col justify-between lg:flex-row">
              <div className="email">
                <div>
                  <label className="">Email</label>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Enter your Email"
                    className="my-2 border-[2px] border-[#1A1A1A] bg-[#141414]"
                  />
                </div>
              </div>
              <div className="phone-codes flex flex-col justify-center">
                <label className="my-2 ">Phone number</label>
                <PhoneInput
                  placeholder="Enter phone number"
                  value={value}
                  onChange={() => {
                    setValue;
                  }}
                 
                />
              </div>
            </div>
            <div className="message my-4">
              <div>
                <label className="">Message</label>
              </div>
              <div>
                <textarea                  
                  placeholder="Enter your Message"
                  className="my-4 h-[30vh] w-[100%] border-[2px] border-[#1A1A1A] bg-[#141414] message-box p-4"
                />
              </div>
            </div>
            <div className="agreement flex flex-col justify-between lg:flex-row mt-[10%]">
              <div className="flex items-center  mb-4">
                <input type="checkbox" style={{ marginRight: "10px" }} />
                <label className="text-[10px] text-[#999999]">
                  Agree to our terms and conditions
                </label>
              </div>
              <button className="rounded-md bg-[#E50000] p-3 text-[13px] text-white">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="my-[10%]">
        <Faq />
      </div>
    </div>
  );
}

export default Page;
