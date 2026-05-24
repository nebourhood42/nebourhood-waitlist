'use client';
import logo from "@/assets/vectors/logo.svg"
import nebourhood_logo_dark from '@/assets/vectors/nebourhood_logo_dark.svg'
import thrust_logo from '@/assets/vectors/thrust_logo.svg'
import envsync_log from '@/assets/vectors/envsync.svg'
import Image from "next/image"
import ImageSection from "./ImageSection";
import { SubmitEvent, useState } from "react";
import GeneralStat from "./GeneralStat";
import Leaderboard from "./Leaderboard";
import Marquee from "react-fast-marquee";
import nebourhood_abstract_desktop from '@/assets/vectors/nebourhood_abstract_desktop.svg'
import nebourhood_abstract_mobile from '@/assets/vectors/nebourhood_abstract_mobile.svg'
import Faq from "./Faq";
import Link from "next/link";
import { Icon } from "@iconify-icon/react";

const contentMargin = 'mx-4 lg:mx-30'

const HomePage = () => {

  const socials = [
    {
      icon: "streamline-logos:x-twitter-logo-block",
      href: "/"
    },
    {
      icon: "ic:baseline-facebook",
      href: "/"
    },
    {
      icon: "mdi:linkedin",
      href: "/"
    },
    {
      icon: "ic:baseline-telegram",
      href: "/"
    }
  ]

  return (
    <section>

      <aside>
        <header className={`flex justify-center bg-black my-4 md:my-11 py-6 rounded-full ${contentMargin}`}>
          <div id="logo">
            <Image src={logo} alt="logo" className="w-21.25px" />
          </div>
        </header>

        <div className={`mt-28 mb-25 ${contentMargin}`}>
          <h1 className="text-[#002231] font-extrabold text-7xl lg:text-9xl text-center w-4/5 lg:w-3/5 mx-auto mb-7 md:mb-7.5">Your next-door Tech big Bro.</h1>
          <p className="text-black/70 text-lg md:text-2xl text-center mx-auto w-4/5 lg:w-1/2 mb-18.5 lg:mb-10">
            We&apos;re building a space where complex tools become simple and opportunities are shared, not hidden. making sure you don&apos;t get left behind.
          </p>
          <div className="w-4/5 md:w-1/2 flex flex-col-reverse lg:flex-row gap-4 lg:gap-4.5 mx-auto text-xl">
            <Link href="/auth/signup" className="bg-[#093645] flex-1 py-4 px-7.5 rounded-full outline-0 cursor-pointer transform transition-transform duration-300 ease-in-out active:scale-90">Join the Waitlist</Link>
            <Link href="/auth/sigin" className="bg-white/50 flex-1 py-4 px-7.5 rounded-full outline-0 text-[#093645] cursor-pointer transform transition-transform duration-300 ease-in-out active:scale-90">Already Joined?</Link>
          </div>
        </div>
      </aside>

      <aside>
        <ImageSection />
      </aside>

      <GeneralStat />
      <Leaderboard />

      <div className="relative">

        <div className="bg-foreground relative text-[#093645] mx-4 max-w-260 pb-13 md:pb-16 lg:mx-auto z-95 rounded-[20px]">
          <div className="pt-13 px-6 md:px-19 pb-12 md:pb-10">
            <h1 className="text-2xl md:text-4xl font-bold mb-3">Earn Your Spot</h1>
            <p className="text-lg md:text-xl">
              This is where the "Neighborhood" becomes a powerhouse. We identify the most committed talent in our circle and integrate them into internal development teams, giving you the chance to gain high-level, production-grade experience on projects that actually scale.
            </p>
          </div>
          <Marquee
            speed={50}
            direction="left"
            pauseOnHover
            loop={0}
            gradient={false}
          >
            {
              [envsync_log, thrust_logo, nebourhood_logo_dark].map((image, i) => <div key={i} className="mx-10 md:mx-16"><Image src={image} alt="supported products" className="object-cover" /></div>)
            }
          </Marquee>
        </div>

        {/* backgrounding */}
        <div className="bg-background absolute top-0 left-0 right-0 bottom-1/2 z-30" />
        <div className="bg-[#093645] absolute bottom-0 left-0 right-0 top-1/2 transform translate-y-1 z-30" />
        {/* //////// */}
      </div>

      <Faq />

      <footer>
        <div className="py-22 lg:pt-35">
          <div className="bg-foreground relative flex flex-col md:flex-row justify-between text-[#093645] mx-4 max-w-260 lg:mx-auto rounded-[20px]">
            <div className="flex flex-col justify-between gap-12.5 py-10 px-6.25 md:px-14 lg:px-17 md:py-13">
              <div>
                <Image src={nebourhood_logo_dark} alt="logo" className="w-9 md:w-27" />
              </div>
              <div>
                <p className="text-black">
                  Build with ease, Build with <br />a team, <i>Build a team.</i>
                </p>
                <div className="flex pt-4 gap-2">
                  {socials.map(({ icon, href }) => (
                    <Link key={icon} href={href} className="text-black">
                      <Icon icon={icon} width={30} height={30} className={``} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <Image src={nebourhood_abstract_mobile} alt="abstract nebourhood logo" className="md:hidden w-102.5 ml-auto" />
              <Image src={nebourhood_abstract_desktop} alt="abstract nebourhood logo" className="hidden md:w-102.5 md:block w-135" />
            </div>
          </div>
        </div>
        <div className="max-w-screen overflow-hidden max-h-32 lg:max-h-40">
          <div className="max-w-screen transform translate-x-1/2 max-md:translate-x-2/5">
            <p className="font-extrabold text-[#093645] text-[210px] md:text-[310px] text-center leading-none transform -translate-x-1/2 max-md:-translate-x-2/3">WAITLIST</p>
          </div>
        </div>
      </footer>
    </section>
  )
}

export default HomePage