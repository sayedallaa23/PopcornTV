import React, { useState } from "react";
import Accordion, { AccordianItem } from "./Accordion";

type Props = {};

function Faq({}: Props) {
  const [selectedAccordion, setSelectedAccordion] = useState<string | null>(
    null,
  );

  return (
    <div className="mx-auto mb-[5rem] w-[88%] md:w-[82%]">
      <div className="mb-[3rem] flex flex-col lg:flex-row">
        <div>
          <h3 className="text-[24px] text-white md:text-[28px] lg:text-[38px]">
            Frequently Asked Questions
          </h3>
          <p className="w-[80%] text-[14px] text-[#999999] md:text-[16px] lg:text-[18px]">
            Got questions? We&apos;ve got answers! Check out our FAQ section to
            find answers to the most common questions about StreamVibe.
          </p>
        </div>
        <button className="mt-[20px] flex h-[49px] w-[140px] items-center justify-center rounded-md bg-[#E50000] p-3 text-[13px] text-white">
          Ask a Question
        </button>
      </div>
      <div className="flex flex-col justify-between lg:flex-row">
        <div className="w-[100%] lg:w-[45%]">
          <Accordion value={selectedAccordion} onChange={setSelectedAccordion}>
            <AccordianItem value="1" trigger="What is PopcornTv?">
              <p className="text-[14px] text-[#999999] md:text-[16px]">
                PopcornTv is a streaming service that allows you to watch movies
                and shows on demand.
              </p>
            </AccordianItem>
            <AccordianItem value="2" trigger="How much does PopcornTv cost?">
              <p className="text-[14px] text-[#999999] md:text-[16px]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi, error.
              </p>
            </AccordianItem>
            <AccordianItem
              value="3"
              trigger="What content is available on PopcornTv?"
            >
              <p className="text-[14px] text-[#999999] md:text-[16px]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi, error.
              </p>
            </AccordianItem>
          </Accordion>
        </div>
        <div className="w-[100%] lg:w-[45%]">
          <Accordion value={selectedAccordion} onChange={setSelectedAccordion}>
            <AccordianItem value="1" trigger="How do I sign up for PopcornTv?">
              <p className="text-[14px] text-[#999999] md:text-[16px]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi, error.
              </p>
            </AccordianItem>
            <AccordianItem
              value="2"
              trigger="What is the PopcornTv free trial?"
            >
              <p className="text-[14px] text-[#999999] md:text-[16px]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi, error.
              </p>
            </AccordianItem>
            <AccordianItem
              value="3"
              trigger="How do I contact PopcornTv customer support?"
            >
              <p className="text-[14px] text-[#999999] md:text-[16px]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi, error.
              </p>
            </AccordianItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default Faq;
