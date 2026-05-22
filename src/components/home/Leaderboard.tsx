
import { useState } from 'react';
import img from '@/assets/imgs/waitlist_leaderboard_image_3.png'
import logo3d from '@/assets/imgs/grok-image-1.png'
import logo_glassmorphism from '@/assets/imgs/nebourhood_glassmorphism.png'
import Image, { StaticImageData } from 'next/image';
import { Icon } from '@iconify-icon/react';

const Leaderboard = () => {
   const [tab, setTab] = useState<'waitlist' | 'invites' | 'socials'>('waitlist')

   const waitlistLeaderboard = {
      "n_3": {
         name: 'Kamsy',
         image: img,
         color: '#F4A40E'
      },
      "n_1": {
         name: 'Daniel',
         image: img,
         color: '#8D268D'
      },
      "n_2": {
         name: 'Chiboy',
         image: img,
         color: '#FF637E'
      },
   }

   const invitesLeaderboard = {
      "n_3": {
         name: 'Kamsy',
         image: img,
         color: '#8A38F5'
      },
      "n_1": {
         name: 'Daniel',
         image: img,
         color: '#4584E1'
      },
      "n_2": {
         name: 'Chiboy',
         image: img,
         color: '#268D69'
      },
   }

   const socialsLeaderboard = {
      "n_3": {
         name: 'X',
         icon: "streamline-logos:x-twitter-logo-block",
         color: '#000000'
      },
      "n_1": {
         name: 'Facebook',
         icon: "logos:facebook",
         color: '#1877F2'
      },
      "n_2": {
         name: 'Telegram',
         icon: "logos:telegram",
         color: '#29A9EA'
      },
   }


   const tab_colors = {
      waitlist: '#8D268D',
      invites: '#4584E1',
      socials: '#093645'
   }

   const HeaderLine = ({ title, children }: { title: string, children: React.ReactNode }) => (
      <div className="mb-20 text-[#093645]">
         <h1 className="text-center text-[35px] md:text-[55px] font-extrabold">{title}.</h1>
         <p className="text-center w-11/12 md:w-4/5 mx-auto text-[18px] md:text-2xl">{children}</p>
      </div>
   )

   const LeaderBoardContent = ({ name, image, _key_, color, icon, showNumbering = true, showPercentile = false }: { name: string, image?: StaticImageData, color: string, _key_: string, icon?: string | null, showNumbering?: boolean, showPercentile?: boolean }) => (
      <div key={name} className='flex flex-col items-center'>
         <div className='flex flex-col items-center mb-8.5 md:mb-20.75'>
            <div className={`overflow-hidden w-19.25  h-19.25 mb-1.5 rounded-full ${icon ? 'w-20 h-20 flex items-center justify-center shadow-[inset_0px_4px_11px_0px_rgba(110,110,110,0.25)]' : 'border-[3px]'}`} style={{ borderColor: color }}>
               {icon && <Icon icon={icon} className={icon === 'streamline-logos:x-twitter-logo-block' ? 'invert' : ''} width={24} height={24} />}
               {image && <Image src={image} alt='waitlist leaderboard image' className='object-cover' />}
            </div>
            <h2 className='text-[#093645] text-lg md:text-xl font-base'>{name}</h2>
         </div>

         <div className='w-[58.4px] md:w-27.5 h-[220.3px] md:h-[414.8px] flex justify-center flex-col rounded-full mb-2 md:mb-4 overflow-hidden relative' style={{
            background: `repeating-linear-gradient(-60deg, #A2A2A2, #A2A2A2 3px, transparent 3px, transparent 9px)`
         }}>
            <div className='absolute bottom-0 left-0 right-0 rounded-t-full' style={{
               background: color, top: 100 - ((5 - Number(_key_.split('_')[1])) * 25) + '%'
            }}></div>
            {showPercentile && <p className='text-white text-shadow-sm text-shadow-gray-500 z-50 transform rotate-90 text-3xl md:text-[45px] font-bold'>0.95%</p>}
         </div>

         {showNumbering && <div className='w-[58.4px] h-[58.4px] md:w-27.5 md:h-27.5 text-shadow-sm text-shadow-gray-500 rounded-full flex justify-center items-center text-[23.89px] md:text-[45px] font-extrabold' style={{ background: color }}>#{_key_.split('_')[1]}</div>}
      </div>
   )

   return (
      <aside className="py-25 lg:pt-35 pb-22 lg:pb-35 bg-background">
         <div className="max-w-200 mx-auto px-4 md:px-0">
            {tab == 'waitlist' ? (
               <HeaderLine title="Leaderboard">The leaderboard is more than just a list; it is a live map of the community’s growth and the commitment of its members.</HeaderLine>
            ) : tab == 'invites' ? (
               <HeaderLine title='Reach'>This page is Dedicated to our biggest individual contributors to our reach. These guys really values their next door Techies.</HeaderLine>
            ) : (
               <HeaderLine title='Following'>This leaderboard tells us where each of you like to hang-out. Each follows tells us exactly which social space you enjoy.</HeaderLine>
            )
            }

            <div className="flex gap-5 mb-10">
               {['waitlist', 'invites', 'socials'].map(item => (
                  <button className={`py-2 md:w-35 text-lg md:text-xl max-md:flex-1 flex items-center justify-center rounded-[30px] transform transition-all duration-300 ease-in-out active:scale-90 ${tab === item ? `text-foreground` : 'text-[#093645]'}`} style={{
                     backgroundColor: tab === item ? tab_colors[tab] : '#EDFFF9'
                  }} key={item} onClick={() => setTab(item as 'waitlist' | 'invites' | 'socials')}>
                     {item}
                  </button>
               ))}
            </div>

            <div className="flex justify-center gap-11.5 md:gap-21.5 bg-foreground rounded-[40px] py-11.5 md:py-15 mb-4 md:mb-10">
               {
                  tab == 'waitlist' ? (
                     Object.entries(waitlistLeaderboard).map(([key, value]) => (
                        <LeaderBoardContent name={value.name} image={value.image} key={tab+key} color={value.color} _key_={key} />
                     ))
                  ) : tab == 'invites' ? (
                     Object.entries(invitesLeaderboard).map(([key, value]) => (
                        <LeaderBoardContent name={value.name} image={value.image} key={tab+key} color={value.color} _key_={key} showNumbering={false} showPercentile />
                     ))
                  ) : (
                     Object.entries(socialsLeaderboard).map(([key, value]) => (
                        <LeaderBoardContent name={value.name} icon={value.icon} key={tab+key} color={value.color} _key_={key} />
                     ))
                  )
               }
            </div>

            <div className='flex justify-between items-end bg-[#093645] rounded-[20px] overflow-hidden'>
               <div className='px-3.5 py-4 md:p-7.5'>
                  {tab == "invites" ? <h1 className='text-lg md:text-xl font-bold mb-1.5'>Total Reach <span className='font-extralight italic'>Since Launch</span></h1> : <h1 className='text-lg md:text-xl font-bold mb-1.5'>The Strength of the Circle</h1>}
                  {tab == "invites" ? <p className='font-extrabold text-[50.65px] lg:text-[78px] leading-tight'>33K+</p> : <p className='md:text-lg text-foreground/60'>Every name on this list represents a person committed to bridging the gap between local ambition and global opportunity.</p>}
               </div>
               <div>
                  <Image src={tab == "invites" ? logo_glassmorphism : logo3d} alt='3D version of Nebourhood Logo' className='object-cover' />
               </div>
            </div>
         </div>
      </aside>
   )
}

export default Leaderboard