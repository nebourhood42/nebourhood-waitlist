import authBg from "@/assets/vectors/authbg.svg";
import darkLogo from "@/assets/vectors/nebourhood_logo_dark.svg";
import onboardingImg from "@/assets/imgs/onboarding.png";
import Image from "next/image";
import CurrentCraft from "./CurrentCraft";
import Shipping from "./Shipping";
import NoSurvivalMode from "./NoSurvivalMode";

const OnboardingLayout = ({
  step,
  onContinue,
}: {
  step: 1 | 2 | 3;
  onContinue: () => void;
}) => {
  return (
    <div className="relative h-screen bg-[linear-gradient(180deg,#C7FFA4_14.42%,#598695_100%)] flex flex-col items-center justify-center gap-8 md:gap-12.5 overflow-hidden">
      {/* Mobile background pattern layer - only visible on mobile, fades in the center */}
      <div
        className="block md:hidden absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${authBg.src})`,
          backgroundRepeat: "repeat",
          backgroundSize: "320px auto",
          maskImage:
            "radial-gradient(circle at center, transparent 20%, black 85%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, transparent 20%, black 85%)",
          opacity: 0.5,
        }}
      />

      {/* Left side pattern - fades out towards the center (desktop) */}
      <div
        className="hidden md:block absolute left-0 top-0 bottom-0 w-[500px] pointer-events-none"
        style={{
          backgroundImage: `url(${authBg.src})`,
          backgroundRepeat: "repeat-y",
          backgroundPosition: "left top",
          backgroundSize: "100% auto",
          maskImage: "linear-gradient(to right, black 80%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, black 80%, transparent 100%)",
          opacity: 0.85,
        }}
      />

      {/* Right side pattern - fades out towards the center (desktop) */}
      <div
        className="hidden md:block absolute right-0 top-0 bottom-0 w-[500px] pointer-events-none"
        style={{
          backgroundImage: `url(${authBg.src})`,
          backgroundRepeat: "repeat-y",
          backgroundPosition: "right top",
          backgroundSize: "100% auto",
          maskImage: "linear-gradient(to left, black 80%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to left, black 80%, transparent 100%)",
          opacity: 0.85,
        }}
      />

      <div className="relative flex justify-between items-center h-screen w-full">
        {/* card */}
        <div className="flex flex-col justify-between w-[50%] h-[97vh] bg-white pt-[100px] pb-[53px] px-[114px] rounded-[30px] m-5">
          <Image src={darkLogo} alt="Nebourhood_darl_logo" className="mx-auto w-[121px]" />

          {step === 1 && <CurrentCraft onContinue={onContinue} />}
          {step === 2 && <Shipping onContinue={onContinue} />}
          {step === 3 && <NoSurvivalMode onContinue={onContinue} />}


          <button
          type="button"
          onClick={onContinue}
          className="w-full bg-[#0a2533] text-white rounded-full py-[13.03px] px-[97.7px] mt-6 text-[23.45px] cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Continue
        </button>

        </div>

        {/* mockup image */}
        <div className="flex-1 w-full">
          <Image src={onboardingImg} width={758} className="" unoptimized alt="mockup_image"/>
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;
