    import type { Metadata } from "next";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Nebourhood Waitlist",
  description: "Join the Nebourhood waitlist",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
          <ReactQueryProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </ReactQueryProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}