"use client"
import { stores, wrapper } from "@/slices/store";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";

const AuthProvider = ({ children, ...rest }: { children: React.ReactNode }) => {
    
    return (
        <SessionProvider> 
            {children} 
        </SessionProvider>
    )
}

export default AuthProvider