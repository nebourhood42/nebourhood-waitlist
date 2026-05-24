import nebourhood_logo_dark from "@/assets/vectors/nebourhood_logo_dark.svg"
import Image from "next/image"

const Header = ({role}: {role: 'signin' | 'signup'}) => {
  return (
    <div>
      <div className="mb-7.5">
        <Image src={nebourhood_logo_dark} alt="nebourhood logo dark" className="object-cover mx-auto" />
      </div>
      <div>
        <h2 className="text-[#002231] font-medium text-3xl text-center">
          {role == "signup" && "Create your account"}
          {role == "signin" && "Welcome Back!"}
        </h2>
        <p className="text-[#002231] font-light text-lg text-center w-2/3 mx-auto">
          {role == "signup" && "Millions are entering tech. Few find their place. This is where you do"}
          {role == "signin" && "Good to see you again.Pick how you signed up to continue."}
        </p>
      </div>
    </div>
  )
}

export default Header