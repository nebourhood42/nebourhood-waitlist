"use client";
import { useState } from "react";

interface ShippingProps {
  onContinue: () => void;
}

const OPTIONS = [
  "I want to build real-world tools",
  "I want to level up my leadership skills",
  "I want to build my own project",
];

const Shipping = ({ onContinue }: ShippingProps) => {
  const [toggled, setToggled] = useState<Record<string, boolean>>({
    [OPTIONS[0]]: true,
  });

  const toggle = (label: string) => {
    setToggled((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div className="flex flex-col justify-between h-[95%]">
      <div className="mt-[50px]">
        <h1 className="text-center text-[35px] text-[#002231] font-medium leading-normal">
          What are we shipping first?
        </h1>
        <p className="text-center text-[18px] text-[#002231] font-light leading-8 tracking-[0.18px] mt-2 w-[394px] mx-auto">
          The Hood has projects waiting. Pick a path, and we’ll get the
          marketplace ready for you.
        </p>

        <div className="flex flex-col gap-4 mt-10">
          {OPTIONS.map((opt) => {
            const on = !!toggled[opt];
            return (
              <div
                key={opt}
                className="flex items-center justify-between px-6 py-[18px] rounded-full border border-gray-200 bg-white shadow-[inset_0px_2px_6px_rgba(0,0,0,0.10),0px_1px_3px_rgba(0,0,0,0.06)]"
              >
                <span className="text-[18px] text-[#002231] font-light leading-8 tracking-[0.18px] mt-2 w-[394px]">
                  {opt}
                </span>
                <button
                  type="button"
                  onClick={() => toggle(opt)}
                  aria-pressed={on}
                  className={`relative w-[44px] h-[26px] rounded-full flex-shrink-0 transition-all
      ${
        on
          ? "bg-gray-100 shadow-[inset_0px_2px_4px_rgba(0,0,0,0.10)]"
          : "bg-gray-100 shadow-[inset_0px_2px_4px_rgba(0,0,0,0.10)]"
      }`}
                >
                  <span
                    className={`absolute top-[3px] w-[20px] h-[20px] rounded-full transition-all duration-200
        ${
          on
            ? "right-[3px] bg-green-400 shadow-[0px_2px_6px_rgba(74,222,128,0.6)]"
            : "left-[3px] bg-gray-300 shadow-[0px_1px_3px_rgba(0,0,0,0.15)]"
        }`}
                  />
                </button>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
};

export default Shipping;
