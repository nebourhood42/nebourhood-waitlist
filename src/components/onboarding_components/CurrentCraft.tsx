"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface CurrentCraftProps {
  onContinue: () => void;
}

const CRAFTS = [
  "Front-End Dev",
  "Back-End Dev",
  "Full-Stack Dev",
  "Mobile Dev",
  "Branding Design",
  "UI/UX Design",
  "Graphic Design",
  "Social Media Management",
  "Content Writing",
  "Product Designer",
  "Project Management",
  "Video Editor",
  "Motion Graphics",
  "Animations",
  "Speaking",
  "Gamer",
  "Data Analytics",
  "Cloud Infrastructure",
  "Cyber Security",
];

const MAX = 5;

const CurrentCraft = ({ onContinue }: CurrentCraftProps) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [years, setYears] = useState("1");

  const toggle = (craft: string) => {
    if (selected.includes(craft)) {
      setSelected((prev) => prev.filter((c) => c !== craft));
    } else {
      if (selected.length >= MAX) return;
      setSelected((prev) => [...prev, craft]);
    }
  };

  return (
    <div className="flex flex-col justify-between h-[95%]">
      <div className="mt-[50px]">
        <h1 className="text-center text-[35px] text-[#002231] font-medium leading-normal">
          What’s Your Current Craft?
        </h1>
        <p className="text-center text-[18px] text-[#002231] font-light leading-8 tracking-[0.18px] mt-2 w-[339px] mx-auto">
          What have you been up to really? and more importantly for how long?
        </p>

        <div className="flex flex-wrap gap-3 justify-center px-10 mt-12">
          {CRAFTS.map((craft) => {
            const isSelected = selected.includes(craft);
            const isDisabled = !isSelected && selected.length >= MAX;
            return (
              <button
                key={craft}
                onClick={() => toggle(craft)}
                disabled={isDisabled}
                className={`px-5 py-2.5 rounded-full  text-sm transition-all
                ${
                  isSelected
                    ? "bg-[#002231] border-[#002231] text-white"
                    : "bg-[#F3F3F3] text-gray-500 hover:border-gray-500"
                }
                ${isDisabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
              `}
              >
                {craft}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="relative flex items-center justify-between w-full p-[10px] pl-[30px] rounded-full border border-gray-200 bg-white shadow-[inset_2px_4px_8px_0px_#00000014]">
          <span className="text-[#002231] text-[18px] font-light leading-8 tracking-[0.18px]">
            How long have you been in the trenches?
          </span>
          <div className="flex items-center gap-5 text-[18px] font-medium text-gray-800 shrink-0 shadow-[0px_4px_12px_0px_#00000020] rounded-full px-[15px] py-[13px]">
            <span>{years}</span>
            <ChevronDown size={24} className="text-gray-400" />
          </div>
          <select
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="absolute inset-0 opacity-0 w-full cursor-pointer rounded-full text-black"
          >
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"].map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>
        </div>
        
      </div>
    </div>
  );
};

export default CurrentCraft;
