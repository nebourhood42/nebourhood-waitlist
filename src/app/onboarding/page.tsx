"use client"

import { useState } from "react"
import OnboardingLayout from "@/components/onboarding_components/OnboardingLayout"
import { useRouter } from "next/navigation";

export default function OnboardingPage () {
    const [step, setStep] = useState< 1 | 2 | 3>(1);
    const router  = useRouter();

    const handleContinue = () => {
        if(step < 3) {
            setStep(prev => (prev + 1) as 1 | 2 | 3)
        } else {
            router.push("/welcome")
        }
    }

    return <OnboardingLayout step={step} onContinue={handleContinue}/>
}