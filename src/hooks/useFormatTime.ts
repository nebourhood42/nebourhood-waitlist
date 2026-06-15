import { useState } from 'react'

const useFormatTime = (ms: number = 0, isTimeStamp: boolean = false) => {
   // ms = isTimeStamp ? ms - Date.now() : ms;
   const [timer, setTimer] = useState(() => isTimeStamp && ms ? ms - Date.now() : ms)

   const handleTimer = (ms: number) => { setTimer(ms) }

   const empty = {
      days: '00', hours: '00', minutes: '00', seconds: '00'
   }

   if (!timer) return [empty, handleTimer] as const

   const totalSeconds = Math.floor(timer / 1000);
   const days = Math.floor(totalSeconds / 86400);
   const hours = Math.floor((totalSeconds % 86400) / 3600);
   const minutes = Math.floor((totalSeconds % 3600) / 60);
   const seconds = totalSeconds % 60;

   const time = {
      days: days.toString().padStart(2, '0'),
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0'),
   }

   return [time, handleTimer] as const
}

export default useFormatTime