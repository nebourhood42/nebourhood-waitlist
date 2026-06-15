"use client";

import Link from "next/link"
import AuthControls from "./AuthControls"
import Header from "./Header"
import authBg from "@/assets/vectors/authbg.svg"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

const AuthErrorBanner = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  
  if (!error) return null;
  
  let errorMessage = "An error occurred during authentication. Please try again.";
  if (error === "OAuthSignin") {
    errorMessage = "Could not start Google Sign-In. Please check your network/configuration.";
  } else if (error === "OAuthCallback" || error === "Callback") {
    errorMessage = "Google authentication failed. Please try again.";
  } else if (error === "OAuthCreateAccount") {
    errorMessage = "Could not link Google account to waitlist profile.";
  }
  
  return (
    <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 text-[#601a1a] text-sm rounded-2xl text-center font-medium backdrop-blur-sm">
      {errorMessage}
    </div>
  );
};

const AuthLayout = ({role}: {role: 'signin' | 'signup'}) => {
  return (
    <div className="relative min-h-screen bg-[linear-gradient(180deg,#C7FFA4_14.42%,#598695_100%)] flex flex-col items-center justify-center gap-8 md:gap-12.5 py-12 px-4 overflow-hidden">
      {/* Mobile background pattern layer - only visible on mobile, fades in the center */}
      <div 
        className="block md:hidden absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${authBg.src})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '320px auto',
          maskImage: 'radial-gradient(circle at center, transparent 20%, black 85%)',
          WebkitMaskImage: 'radial-gradient(circle at center, transparent 20%, black 85%)',
          opacity: 0.5,
        }}
      />

      {/* Left side pattern - fades out towards the center (desktop) */}
      <div 
        className="hidden md:block absolute left-0 top-0 bottom-0 w-[500px] pointer-events-none"
        style={{
          backgroundImage: `url(${authBg.src})`,
          backgroundRepeat: 'repeat-y',
          backgroundPosition: 'left top',
          backgroundSize: '100% auto',
          maskImage: 'linear-gradient(to right, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, black 80%, transparent 100%)',
          opacity: 0.85,
        }}
      />

      {/* Right side pattern - fades out towards the center (desktop) */}
      <div 
        className="hidden md:block absolute right-0 top-0 bottom-0 w-[500px] pointer-events-none"
        style={{
          backgroundImage: `url(${authBg.src})`,
          backgroundRepeat: 'repeat-y',
          backgroundPosition: 'right top',
          backgroundSize: '100% auto',
          maskImage: 'linear-gradient(to left, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to left, black 80%, transparent 100%)',
          opacity: 0.85,
        }}
      />

      <div className="relative z-10 w-full max-w-[424px]">
        <Header role={role} />
        <Suspense fallback={null}>
          <AuthErrorBanner />
        </Suspense>
        <AuthControls role={role} />
      </div>

      {role == "signup" && (
        <p className="relative z-10 text-center font-bold text-xl mt-8 md:mt-16">
          Already in the hood? <Link href='/auth/signin' className="text-[#002231]">Sign in</Link>
        </p>
      )}
      {role == "signin" && (
        <p className="relative z-10 text-center font-bold text-xl mt-8 md:mt-16">
          No Account? <Link href='/auth/signup' className="text-[#002231]">Sign up</Link>
        </p>
      )}
    </div>
  )
}

export default AuthLayout