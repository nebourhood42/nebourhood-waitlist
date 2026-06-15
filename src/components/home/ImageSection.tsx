import Image from 'next/image'
import generated_image_female from '@/assets/imgs/Gemini_Generated_Image_female.png'
import { desktopColorMap, mobileColorMap } from './colorMapping'
import { motion } from 'framer-motion'

// Hoisted outside ImageSection to prevent re-creation on every render
const MobileBoxes = () => (
   <div
      className='grid grid-cols-4 grid-rows-6 absolute inset-0 z-20 md:hidden' style={{ perspective: '1000px' }}
   >
      {mobileColorMap.map((color, i) => (
         <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.3, ease: 'linear', delay: i * 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
            key={'mobileBox_' + i}
            className="relative transform transition-transform duration-300 ease-in-out hover:scale-125 hover:transform-[rotateZ(180deg)] active:scale-125 active:transform-[rotateZ(180deg)]"
            style={{ background: color, transformStyle: 'preserve-3d' }}
         />
      ))}
   </div>
)

const DesktopBoxes = () => (
   <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
      className="md:grid grid-cols-8 grid-rows-6 absolute inset-0 z-20 hidden"
      style={{ perspective: '1000px' }}
   >
      {desktopColorMap.map((color, i) => (
         <div
            key={'desktopBox_' + i}
            className="relative transform transition-transform duration-300 ease-in-out hover:scale-125 hover:transform-[rotateZ(180deg)] active:scale-125 active:transform-[rotateZ(180deg)]"
            style={{ background: color, transformStyle: 'preserve-3d' }}
         />
      ))}
   </motion.div>
)

const Details = () => (
   <div className='hidden md:grid grid-cols-8 grid-rows-6 absolute inset-0 z-30 pointer-events-none'>
      <div className='col-span-3 row-start-3 flex justify-end items-center'>
         <p className='text-black font-bold text-4xl w-4/5 lg:text-5xl xl:text-7xl pl-4'>A clearer path to the global tech market.</p>
      </div>

      <div className='col-start-6 col-span-2 row-start-3 flex justify-center items-end'>
         <p className='text-black text-lg w-11/12 pb-2.5'>Consider us your steady hand as you navigate the transition from where you are to where you want to be.</p>
      </div>
   </div>
)

const ImageSection = () => {
   return (
      <div className="w-full flex justify-center overflow-hidden relative">
         <div className="min-w-241.5 flex justify-center z-10">
            <Image
               src={generated_image_female}
               loading="eager"
               alt="hero page female image"
               className="object-cover xl:w-screen"
            />
         </div>

         <MobileBoxes />
         <DesktopBoxes />
         <Details />
      </div>
   )
}

export default ImageSection