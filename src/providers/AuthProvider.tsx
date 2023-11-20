"use client"
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children, ...rest }: { children: React.ReactNode }) => {
    
    return (
        <SessionProvider> 
            {children} 
        </SessionProvider>
    )
}

export default AuthProvider