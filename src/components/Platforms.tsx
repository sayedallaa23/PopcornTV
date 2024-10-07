import React from "react";
import { FaMobile } from "react-icons/fa6";
import { FaTablet } from "react-icons/fa6";
import { MdOutlineLiveTv } from "react-icons/md";
import { FaLaptop } from "react-icons/fa";
import { IoGameControllerOutline } from "react-icons/io5";
import { BsHeadsetVr } from "react-icons/bs";
type Props = {};

function Platforms({}: Props) {
  return (
    <div className="mb-[5rem]" id="platforms-section">
      <div className="mx-auto mb-[4rem] w-[88%] md:w-[82%]">
        <h3 className="mb-[10px] text-[24px] text-white md:text-[28px] lg:text-[38px]">
          We Provide you streaming experience across various devices.
        </h3>
        <p className="mb-[20px] w-[90%] text-[14px] text-[#999999] md:text-[16px] lg:text-[18px]">
          With PopcornTv, you can enjoy your favorite movies and TV shows
          anytime, anywhere.
        </p>
      </div>
      <div className="mx-auto flex flex-col md:w-[88%] lg:w-[83%] lg:flex-row lg:flex-wrap">
        <div className="grain mx-auto mb-[20px] w-[90%] rounded-[10px] border-[1px] border-[#262626] p-[25px] md:w-[98%] md:py-[30px] lg:w-[32%]">
          <div className="mb-[30px] flex items-center">
            <div className="mr-[10px] rounded-[10px] bg-[#141414] p-2">
              <FaMobile className="text-[20px] text-[#E50000]" />
            </div>
            <h4 className="text-[18px] text-white md:text-[20px] lg:text-[24px]">
              Smartphones
            </h4>
          </div>
          <p className="text-[14px] text-[#999999]">
            PopcornTv is optimized for both Android and iOS smartphones.
            Download our app from the Google Play Store or the Apple App Store
          </p>
        </div>
        <div className="grain mx-auto mb-[20px] w-[90%] rounded-[10px] border-[1px] border-[#262626] p-[25px] md:w-[98%] md:py-[30px] lg:w-[32%]">
          <div className="mb-[30px] flex items-center">
            <div className="mr-[10px] rounded-[10px] bg-[#141414] p-2">
              <FaTablet className="text-[20px] text-[#E50000]" />
            </div>
            <h4 className="text-[18px] text-white md:text-[20px] lg:text-[24px]">
              Tablet
            </h4>
          </div>
          <p className="text-[14px] text-[#999999]">
            PopcornTv is optimized for both Android and iOS smartphones.
            Download our app from the Google Play Store or the Apple App Store
          </p>
        </div>
        <div className="grain mx-auto mb-[20px] w-[90%] rounded-[10px] border-[1px] border-[#262626] p-[25px] md:w-[98%] md:py-[30px] lg:w-[32%]">
          <div className="mb-[30px] flex items-center">
            <div className="mr-[10px] rounded-[10px] bg-[#141414] p-2">
              <MdOutlineLiveTv className="text-[20px] text-[#E50000]" />
            </div>
            <h4 className="text-[18px] text-white md:text-[20px] lg:text-[24px]">
              Smart TV
            </h4>
          </div>
          <p className="text-[14px] text-[#999999]">
            PopcornTv is optimized for both Android and iOS smartphones.
            Download our app from the Google Play Store or the Apple App Store
          </p>
        </div>
        <div className="grain mx-auto mb-[20px] w-[90%] rounded-[10px] border-[1px] border-[#262626] p-[25px] md:w-[98%] md:py-[30px] lg:w-[32%]">
          <div className="mb-[30px] flex items-center">
            <div className="mr-[10px] rounded-[10px] bg-[#141414] p-2">
              <FaLaptop className="text-[20px] text-[#E50000]" />
            </div>
            <h4 className="text-[18px] text-white md:text-[20px] lg:text-[24px]">
              Laptops
            </h4>
          </div>
          <p className="text-[14px] text-[#999999]">
            PopcornTv is optimized for both Android and iOS smartphones.
            Download our app from the Google Play Store or the Apple App Store
          </p>
        </div>
        <div className="grain mx-auto mb-[20px] w-[90%] rounded-[10px] border-[1px] border-[#262626] p-[25px] md:w-[98%] md:py-[30px] lg:w-[32%]">
          <div className="mb-[30px] flex items-center">
            <div className="mr-[10px] rounded-[10px] bg-[#141414] p-2">
              <IoGameControllerOutline className="text-[20px] text-[#E50000]" />
            </div>
            <h4 className="text-[18px] text-white md:text-[20px] lg:text-[24px]">
              Gaming Consoles
            </h4>
          </div>
          <p className="text-[14px] text-[#999999]">
            PopcornTv is optimized for both Android and iOS smartphones.
            Download our app from the Google Play Store or the Apple App Store
          </p>
        </div>
        <div className="grain mx-auto mb-[20px] w-[90%] rounded-[10px] border-[1px] border-[#262626] p-[25px] md:w-[98%] md:py-[30px] lg:w-[32%]">
          <div className="mb-[30px] flex items-center">
            <div className="mr-[10px] rounded-[10px] bg-[#141414] p-2">
              <BsHeadsetVr className="text-[20px] text-[#E50000]" />
            </div>
            <h4 className="text-[18px] text-white md:text-[20px] lg:text-[24px]">
              VR Headsets
            </h4>
          </div>
          <p className="text-[14px] text-[#999999]">
            PopcornTv is optimized for both Android and iOS smartphones.
            Download our app from the Google Play Store or the Apple App Store
          </p>
        </div>
      </div>
    </div>
  );
}

export default Platforms;
