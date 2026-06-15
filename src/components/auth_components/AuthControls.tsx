import google from "@/assets/imgs/google.png";
import apple from "@/assets/imgs/apple.png";
import github from "@/assets/imgs/github.png";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useGoogleLogin } from "@react-oauth/google";

const AuthControls = ({ role }: { role: "signin" | "signup" }) => {
  const { signupWithGoogle, signinWithGoogle } = useAuth();
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const controls = {
    google: { img: google, color: "#093645" },
    apple: { img: apple, color: "#FFFFFF" },
    github: { img: github, color: "#FFFFFF26" },
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const idToken = tokenResponse.access_token;
      if (!idToken) return;
      setIsPending(true);
      try {
        if (role === "signup") {
          const referralCode = localStorage.getItem("waitlist_referred_by");
          await signupWithGoogle(idToken, referralCode);
          router.push("/welcome");
        } else {
          await signinWithGoogle(idToken);
          router.push("/");
        }
      } catch (err) {
        console.error("Google Auth error:", err);
        router.push(`/auth/${role}?error=Callback`);
      } finally {
        setIsPending(false);
      }
    },
    onError: () => {
      console.error("Google Login Failed");
      router.push(`/auth/${role}?error=OAuthSignin`);
    },
  });

  const handleControls = (key: string) => {
    if (key === "google") {
      handleGoogleLogin();
      return;
    }
    console.log(`${role} with ${key} is not supported yet.`);
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {isPending ? (
        <div className="flex justify-center items-center py-4">
          <div className="w-8 h-8 border-4 border-t-[#093645] border-gray-200 rounded-full animate-spin"></div>
        </div>
      ) : (
        Object.entries(controls).map(([key, value]) => (
          <button
            key={key}
            className={`capitalize flex gap-3 justify-center items-center w-full py-4 rounded-full text-xl font-normal outline-0 cursor-pointer transform transition-transform duration-300 ease-in-out active:scale-90 ${key === "google" ? "text-white" : "text-[#002231]"}`}
            onClick={() => handleControls(key)}
            style={{ background: value.color }}
          >
            <Image src={value.img} alt={key} className="object-cover" width={key === "google" ? 36 : 17.5} />
            <span>continue with {key}</span>
          </button>
        ))
      )}
      {role === "signup" && (
        <p className="text-center font-light text-lg md:text-[20.2px] mt-2">
          By continuing you agree to our{" "}
          <Link href="/" className="text-white font-semibold underline">Terms</Link> &{" "}
          <Link href="/" className="text-white font-semibold underline">Privacy</Link>
        </p>
      )}
      {role === "signin" && (
        <p className="text-center font-light text-lg">
          Use the same account you signed up with.
        </p>
      )}
    </div>
  );
};

export default AuthControls;