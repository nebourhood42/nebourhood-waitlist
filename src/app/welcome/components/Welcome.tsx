"use client";
import confetti from '@/assets/vectors/confetti.svg'
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function WelcomeModal() {
  const { user } = useAuth();
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (user?.referral_code) {
      const refLink = `${window.location.origin}/?ref=${user.referral_code}`;
      navigator.clipboard.writeText(refLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative py-12 px-4 md:py-0 md:px-0 overflow-x-hidden bg-[#00000050] backdrop-blur-sm">


      {/* SVG defs */}
      <svg width="0" height="0" className="absolute">
        <defs>
          {/* Desktop clipPath */}
          <clipPath id="card-shape" clipPathUnits="objectBoundingBox">
            <path
              d="
                M0.20,0
                H0.435

                C0.460,0
                 0.465,0.055
                 0.5,0.055

                C0.538,0.055
                 0.538,0
                 0.560,0

                H0.96

                C0.982,0
                 1,0.03
                 1,0.07

                V0.93

                C1,0.97
                 0.982,1
                 0.96,1

                H0.04

                C0.018,1
                 0,0.97
                 0,0.93

                V0.07

                C0,0.03
                 0.018,0
                 0.04,0
                Z
              "
            />
          </clipPath>

          {/* Mobile clipPath (wider notch percentage to fit absolute close button) */}
          <clipPath id="card-shape-mobile" clipPathUnits="objectBoundingBox">
            <path
              d="
                M0.15,0
                H0.344

                C0.404,0
                 0.416,0.055
                 0.5,0.055

                C0.591,0.055
                 0.591,0
                 0.644,0

                H0.94

                C0.97,0
                 1,0.03
                 1,0.07

                V0.93

                C1,0.97
                 0.97,1
                 0.94,1

                H0.06

                C0.03,1
                 0,0.97
                 0,0.93

                V0.07

                C0,0.03
                 0.03,0
                 0.06,0
                Z
              "
            />
          </clipPath>
        </defs>
      </svg>


      <div className="relative w-full">

        {/* floating close button */}
        <button
          onClick={() => {
            // Store scroll intent — HomePage will read this on mount and scroll accordingly
            sessionStorage.setItem('scrollTo', 'general-stats');
            router.push('/');
          }}
          className="
            absolute
            left-1/2
            -translate-x-1/2
            top-[-38px]
            z-50
            w-[52px]
            h-[52px]
            rounded-full
            flex
            items-center
            justify-center
            hover:w-[80px] hover:h-[80px]
            transition-all duration-300 ease-linear
            cursor-pointer
          "
        >
          <div
            className="
              w-[52px]
              h-[52px]
              rounded-full
              bg-[#85F45B]
              flex
              items-center
              justify-center
            "
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              stroke="black"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            >
              <path d="M6 6L18 20" />
              <path d="M18 6L6 20" />
            </svg>
          </div>
        </button>

        {/* card */}
        <div
          className="
            w-full
            max-w-[688px]
            mx-auto
            bg-[#85F45B]
            px-6
            sm:px-16
            pt-[38px]
            md:pt-[78px]
            pb-10
            md:pb-[60px]
            card-clipped
          "
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image src={confetti} alt="confetti" width={130} height={130} />
          </div>

          {/* Heading */}
          <h1
            className="
              text-center
              text-[#002231]
              text-[40px]
              sm:text-[45px]
              font-bold
              leading-none
            "
          >
            Welcome to the Hood
          </h1>

          {/* Subtext */}
          <p
            className="
              text-center
              text-[#093645]
              text-[18px]
              sm:text-[22px]
              font-light
              leading-normal
              mt-4
              md:mt-6
            "
          >
            {user ? (
              <>
                You&apos;re officially part of the crew, <span className="font-semibold">{user.fullName}</span>.
              </>
            ) : (
              <>You&apos;re officially part of the crew.</>
            )}
            <br />
            Let&apos;s find your place in tech.
          </p>

          {/* CTA */}
          <div className="flex flex-col items-center mt-10 md:mt-24">
            <button
              onClick={handleCopy}
              className="
                w-full
                max-w-[370px]
                h-[52px]
                rounded-full
                bg-[#093645]
                text-white
                text-[16px]
                md:text-[18px]
                font-normal
                cursor-pointer
                transition-all duration-300
                active:scale-95
              "
            >
              {copied ? "Referral Link Copied!" : "Invite a friend"}
            </button>
            {user?.referral_code && (
              <span className="text-xs text-[#093645] mt-2.5 font-mono opacity-80">
                Code: {user.referral_code}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}