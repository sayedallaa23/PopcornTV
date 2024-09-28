"use client";

import Pricing from "@/components/Pricing";
import React, { useState } from "react";

type Props = {};

function Subscriptions({}: Props) {
  const [basicPlan, setBasicPlan] = useState(true);
  const [standardPlan, SetStandardPlan] = useState(false);
  const [premiumPlan, setPremiumPlan] = useState(false);

  return (
    <div className="subs-page mx-auto w-[90%] text-white md:w-[84%]">
      <div className="mt-[10%]">
        <Pricing />
      </div>
      <div>
        <h2 className="text-[24px] text-white md:text-[28px] lg:text-[38px]">
          Compare our plans and find the right one for you
        </h2>
        <p className="mb-[20px] w-[90%] text-[14px] text-[#999999] md:text-[16px] lg:text-[18px]">
          StreamVibe offers three different plans to fit your needs: Basic,
          Standard, and Premium. Compare the features of each plan and choose
          the one that's right for you.
        </p>
      </div>
      <div className="pricing-table my-[8%]">
        <table className="hidden lg:block">
          <tr>
            <th>Features</th>
            <th>Basic</th>
            <th>Standard</th>
            <th>Premium</th>
          </tr>
          <tr>
            <td>Price</td>
            <td>$9.99/Month</td>
            <td>$12.99/Month</td>
            <td>$14.99/Month</td>
          </tr>
          <tr>
            <td>Content</td>
            <td>
              Access to a wide selection of movies and shows, including some new
              releases.
            </td>
            <td>
              Access to a wider selection of movies and shows, including most
              new releases and exclusive content
            </td>
            <td>
              Access to a widest selection of movies and shows, including all
              new releases and Offline Viewing
            </td>
          </tr>
          <tr>
            <td>Devices</td>
            <td>Watch on one device simultaneously</td>
            <td>Watch on Two device simultaneously</td>
            <td>Watch on Four device simultaneously</td>
          </tr>
          <tr>
            <td>Free Trail</td>
            <td>7 Days</td>
            <td>7 Days</td>
            <td>7 Days</td>
          </tr>
          <tr>
            <td>Cancel Anytime</td>
            <td>Yes</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>HDR</td>
            <td>No</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Dolby Atmos</td>
            <td>No</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Ad - Free</td>
            <td>No</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Offline Viewing</td>
            <td>No</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Family Sharing</td>
            <td>No</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
        </table>
        <div className="mob-pricing basic-plan lg:hidden">
          <div className="mb-[50px] flex h-[50px] w-fit items-center rounded-[10px] border-[2px] border-[#1A1A1A] bg-[#141414] text-[#BFBFBF] md:mb-[80px] md:h-[80px]">
            <div className="p-0 lg:p-2">
              <button
                className={`mx-2 rounded-[10px] p-[8px] hover:bg-[#1A1A1A] focus:bg-[#1A1A1A] focus:text-white md:p-3 xl:p-4 ${basicPlan ? "bg-[#1A1A1A]" : ""}`}
                onClick={() => {
                  setBasicPlan(true);
                  SetStandardPlan(false);
                  setPremiumPlan(false);
                }}
              >
                Basic
              </button>
            </div>
            <div className="p-0 lg:p-2">
              <button
                className={`mx-2 rounded-[10px] p-[8px] hover:bg-[#1A1A1A] focus:bg-[#1A1A1A] focus:text-white md:p-3 xl:p-4 ${standardPlan ? "bg-[#1A1A1A]" : ""}`}
                onClick={() => {
                  setBasicPlan(false);
                  SetStandardPlan(true);
                  setPremiumPlan(false);
                }}
              >
                Standard
              </button>
            </div>
            <div className="p-0 lg:p-2">
              <button
                className={`mx-2 rounded-[10px] p-[8px] hover:bg-[#1A1A1A] focus:bg-[#1A1A1A] focus:text-white md:p-3 xl:p-4 ${premiumPlan ? "bg-[#1A1A1A]" : ""}`}
                onClick={() => {
                  setBasicPlan(false);
                  SetStandardPlan(false);
                  setPremiumPlan(true);
                }}
              >
                Premium
              </button>
            </div>
          </div>
          <div
            className={`${!basicPlan && "hidden"} mob-pricing-table border-[1px] border-[#262626] bg-black`}
          >
            <div className="table-pricing flex items-center justify-between">
              <div>
                <p className="header">Price</p>
                <p>$9.99/Month</p>
              </div>
              <div>
                <p className="header">Free Trail </p>
                <p>7 Days </p>
              </div>
            </div>
            <div className="content">
              <p className="header">Content</p>
              <p>
                Access to a wide selection of movies and shows, including some
                new releases.{" "}
              </p>
            </div>
            <div className="devices">
              <p className="header">Devices</p>
              <p>Watch on one device simultaneously </p>
            </div>
            <div className="flex items-center">
              <div className="w-[50%]">
                <p className="header">Cancel Anytime </p>
                <p>Yes</p>
              </div>
              <div>
                <p className="header">HDR</p>
                <p>No</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-[50%]">
                <p className="header">Dolby Atmos</p>
                <p> No</p>
              </div>
              <div>
                <p className="header">Ad-Free</p>
                <p>No</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-[50%]">
                <p className="header">Offline Viewing</p>
                <p>No</p>
              </div>
              <div>
                <p className="header">Family Sharing</p>
                <p>No</p>
              </div>
            </div>
          </div>
          {/* s plan*/}
          <div
            className={`${!standardPlan && "hidden"} mob-pricing-table border-[1px] border-[#262626] bg-black`}
          >
            <div className="table-pricing flex items-center justify-between">
              <div>
                <p className="header">Price</p>
                <p>$12.99/Month</p>
              </div>
              <div>
                <p className="header">Free Trail </p>
                <p>7 Days </p>
              </div>
            </div>
            <div className="content">
              <p className="header">Content</p>
              <p>
              Access to a wider selection of movies and shows, including most new releases and exclusive content	{" "}
              </p>
            </div>
            <div className="devices">
              <p className="header">Devices</p>
              <p>Watch on one device simultaneously </p>
            </div>
            <div className="flex items-center">
              <div className="w-[50%]">
                <p className="header">Cancel Anytime </p>
                <p>Yes</p>
              </div>
              <div>
                <p className="header">HDR</p>
                <p>Yes</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-[50%]">
                <p className="header">Dolby Atmos</p>
                <p> Yes</p>
              </div>
              <div>
                <p className="header">Ad-Free</p>
                <p>Yes</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-[50%]">
                <p className="header">Offline Viewing</p>
                <p>Yes</p>
              </div>
              <div>
                <p className="header">Family Sharing</p>
                <p>Yes</p>
              </div>
            </div>
          </div>
          {/* p plan */}
          <div
            className={`${!premiumPlan && "hidden"} mob-pricing-table border-[1px] border-[#262626] bg-black`}
          >
            <div className="table-pricing flex items-center justify-between">
              <div>
                <p className="header">Price</p>
                <p>$14.99/Month</p>
              </div>
              <div>
                <p className="header">Free Trail </p>
                <p>7 Days </p>
              </div>
            </div>
            <div className="content">
              <p className="header">Content</p>
              <p>
              Access to a widest selection of movies and shows, including all new releases and Offline Viewing
              {" "}
              </p>
            </div>
            <div className="devices">
              <p className="header">Devices</p>
              <p>Watch on one device simultaneously </p>
            </div>
            <div className="flex items-center">
              <div className="w-[50%]">
                <p className="header">Cancel Anytime </p>
                <p>Yes</p>
              </div>
              <div>
                <p className="header">HDR</p>
                <p>Yes</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-[50%]">
                <p className="header">Dolby Atmos</p>
                <p> Yes</p>
              </div>
              <div>
                <p className="header">Ad-Free</p>
                <p>Yes</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-[50%]">
                <p className="header">Offline Viewing</p>
                <p>Yes</p>
              </div>
              <div>
                <p className="header">Family Sharing</p>
                <p>Yes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscriptions;
