// "use client";

import Nav from "@/components/Nav";
import { ReactNode } from "react";
import { useParams } from 'next/navigation'
import { getServerSession } from "next-auth";
import { useEffect, useState } from "react";
import axios from "axios";
import { options } from "../api/auth/[...nextauth]/options";




export default async function PlatformLayout(props:{children: ReactNode}){
    const session = await getServerSession(options);
    return(
        <div className="h-screen w-full flex flex-col md:grid md:grid-cols-5 bg-white">
            
            <Nav session={session}  />
            <div className="h-full md:col-span-4">
                {props.children}
            </div>
        </div>
    )
}