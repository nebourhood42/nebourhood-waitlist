'use client';
import { Icon } from '@iconify-icon/react'
import React, { useState } from 'react'

const Faq = () => {

   const [faq, setFaq] = useState([
      {
         title: 'What is the core mission of The NebourHood?',
         details: "We exist to provide a structural bridge between local ambition and the global tech labor market. Our goal is to take the confusion and frustration out of the digital transition by providing high-level guidance and insider knowledge to those who have the drive but lack the roadmap. We aren't just a community; we are a starting point for professional mobility.",
         active: true
      },
      {
         title: 'How does this differ from a typical tech "hustle" group?',
         details: 'We do not promote "get-rich-quick" schemes or the "hustle" spirit. We believe in dignity, stability, and the steady acquisition of high-demand skills. While others focus on the noise of the streets, we focus on the standards of the global market—preparing you to compete at the highest level through composure and competence.',
         active: false
      },
      {
         title: 'Why is there a waitlist and a ranking system?',
         details: `Quality mentorship requires structure. We grow in waves to ensure that every person who enters the 'Hood receives the attention and resources they need. The ranking system rewards those who help us build the community; it’s our way of identifying individuals who understand that looking out for the "neighborhood" is the best way to elevate everyone’s chances.`,
         active: false
      },
      {
         title: 'What exactly do I get as a member?',
         details: `Membership grants you access to "The Blueprint"—our curated path of technical insights, career guidance, and community support. You will gain access to mentorship from those who have already successfully navigated the global market, as well as opportunities for portfolio audits, tool discounts, and direct referrals to hiring networks that are often gatekept.`,
         active: false
      },
      {
         title: 'Is The NebourHood only for experienced developers?',
         details: `No. We are specifically built for those at a disadvantage—people who feel "left behind" by the fast-moving tech world. Whether you are just starting to explore a digital career or you are stuck in a cycle of confusion, we provide the foundational support needed to move from the sidelines to a professional career.`,
         active: false
      },
      {
         title: 'What is the long-term goal for a member?',
         details: `Our success is measured by your mobility. We want to see you move from a place of digital uncertainty to a position of stability in the global tech economy. We provide the bridge; you provide the walk. Our goal is to ensure that your starting point doesn't dictate your destination.`,
         active: false
      },
   ])

   const handleSetFaq = (title: string) => {
      setFaq(prev => prev.map(q => ({
         ...q,
         active: q.title === title ? !q.active : false
      })))
   }

   return (
      <aside className="py-25 lg:pt-35 pb-22 lg:pb-35 bg-[#093645]">
         <div className="max-w-200 mx-auto px-4 md:px-0">
            <div className="mb-20 text-foreground">
               <h1 className="text-center text-[35px] md:text-[55px] font-extrabold">FAQ</h1>
               <p className="text-center w-11/12 md:w-4/5 mx-auto text-[18px] md:text-2xl">The leaderboard is more than just a list; it is a live map of the community’s growth and the commitment of its members.</p>
            </div>

            <div className="flex flex-col gap-5 md:gap-7.5">
               {faq.map(({ title, details, active }) => (
                  <div key={title} className="flex items-end bg-foreground relative text-[#093645] mx-4 max-w-260 lg:mx-auto z-95 rounded-[20px] pt-13 px-6 md:px-19 pb-12 md:pb-10 gap-3 md:gap-4">
                     <div className="">
                        <h1 className="text-2xl md:text-4xl font-bold">{title}</h1>
                        <div className={`overflow-hidden transition-all duration-300 ${active ? "max-h-250" : "max-h-0"}`}>
                           <p className="text-lg md:text-xl mt-3">
                              {details}
                           </p>
                        </div>
                     </div>

                     <div>
                        <button onClick={() => handleSetFaq(title)} className="p-4 md:p-5 bg-[#09364533] flex items-center justify-center rounded-full">
                           <Icon icon='ion:chevron-down-outline' width={24} height={24} className={`text-[#093645] transition-all duration-300 transform ${active ? 'rotate-z-180' : 'rotate-z-0'}`} />
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </aside>
   )
}

export default Faq