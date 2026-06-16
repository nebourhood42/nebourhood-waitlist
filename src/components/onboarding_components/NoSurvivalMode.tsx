interface NoSurvivalModeProps {
  onContinue: () => void;
}

const NoSurvivalMode = ({ onContinue }: NoSurvivalModeProps) => {
  return (
    <div className="flex flex-col justify-between h-[95%]">
      <div className="mt-[50px]">
        <h1 className="text-center text-[35px] text-[#002231] font-medium leading-normal">
          NO MORE SURVIVAL MODE.
        </h1>
        <p className="text-center text-[18px] text-[#002231] font-light leading-8 tracking-[0.18px] mt-2 w-[394px] mx-auto">
          We’re building a place where your craft is the currency and your
          growth is the goal.
        </p>
      </div>
    </div>
  );
};

export default NoSurvivalMode;
