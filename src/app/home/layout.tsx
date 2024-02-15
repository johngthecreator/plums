"use client";

import Nav from "@/components/Nav";
import { ReactNode } from "react";
import { useParams } from 'next/navigation'
import { SessionProvider } from "next-auth/react";

export default function PlatformLayout(props:{children: ReactNode}){
    const params = useParams<{ space: string; }>()
    return(
        <SessionProvider>
            <div className="h-screen w-full flex flex-col md:grid md:grid-cols-5 bg-white">
                <Nav space={params.space}/>
                <div className="h-full md:col-span-4">
                    {props.children}
                </div>
            </div>
        </SessionProvider>
    )
}