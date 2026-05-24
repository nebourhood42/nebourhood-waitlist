"use client";
import Link from "next/link"
import AuthControls from "./AuthControls"
import Header from "./Header"

const AuthLayout = ({role}: {role: 'signin' | 'signup'}) => {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#C7FFA4_14.42%,#598695_100%)] flex flex-col items-center justify-center gap-12.5 px-4">
      <Header role={role} />
      <AuthControls role={role} />

      {role == "signup" && <p className="text-center font-bold text-xl">Already in the hood? <Link href='/auth/signin' className="text-[#002231]">Sign in</Link></p>}
      {role == "signin" && <p className="text-center font-bold text-xl">No Account? <Link href='/auth/signup' className="text-[#002231]">Sign up</Link></p>}
    </div>
  )
}

export default AuthLayout