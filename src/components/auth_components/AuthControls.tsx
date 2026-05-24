import google from "@/assets/imgs/google.png"
import apple from "@/assets/imgs/apple.png"
import github from "@/assets/imgs/github.png"
import Image from "next/image"
import Link from "next/link"

const AuthControls = ({role}: {role: 'signin' | 'signup'}) => {
   const controls = {
      google: {img: google, color: '#093645'},
      apple: {img: apple, color: '#FFFFFF'},
      github: {img: github, color: '#FFFFFF26'}
   }
   const handleControls = (key: string) => {
      switch (role){
         case "signup":
            console.log("signup -" + key)
            break;
         case "signin":
            console.log("signin -" + key)
            break;
      }
   }
  return (
    <div className="w-full flex flex-col gap-3">
      {
         Object.entries(controls).map(([key, value]) => (
            <button key={key} className={`capitalize flex gap-3 justify-center items-center w-full py-4 rounded-full text-xl font-normal outline-0 cursor-pointer transform transition-transform duration-300 ease-in-out active:scale-90
            ${key == 'google' ? 'text-white' : 'text-[#002231]'}`}
            onClick={() => handleControls(key)}
            style={{background: value.color}}>
               <Image src={value.img} alt={key} className="object-cover" width={key == "google" ? 36 : 17.5} />
               <span>continue with {key}</span>
            </button>
         ))
      }
      {role == "signup" && <p className="text-center font-light text-lg">By continuing you agree to our <Link href='/' className="text-white underline">Terms</Link> & <Link href='/' className="text-white underline">Privacy</Link></p>}
      {role == "signin" && <p className="text-center font-light text-lg">Use the same account you signed up with.</p>}
    </div>
  )
}

export default AuthControls