"use client";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { useEffect, useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import axios from "axios";


export default function Nav(props:{space: string}) {
    const { data: session, status } = useSession()
    const [spaces, setSpaces] = useState([]);

    useEffect(()=>{
        getSpaces();
    },[])

    const createNewSpace = () => {
        axios.post('/api/create-space', {
            spaceName: 'Fred',
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    const getSpaces = () => {
        axios.get('/api/get-spaces')
        .then((resp) => {
            console.log(resp.data)
            setSpaces(resp.data)
        })
    }

    return (
        <div>
            <Sheet>
                <div className="flex md:hidden justify-between items-center bg-gradient-to-r from-[#6E43B1] to-[#c39eff] h-16 p-2">
                    <SheetTrigger className="md:hidden">
                        <CgMenuGridO className="text-white text-5xl" />
                    </SheetTrigger>
                    <h2 className="font-bold text-2xl text-white">{props.space}</h2>
                </div>
                <SheetContent side={"left"} className="flex flex-col p-5 bg-gradient-to-b from-[#6E43B1] to-[#E9DBFF]">
                    <div className="flex flex-col justify-between bg-gradient-to-b from-[#6E43B1] to-[#E9DBFF] w-full h-full p-5">
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-5 mb-3 items-center font-semibold text-xl text-white">
                                <img src={`${session?.user?.image}`} className="h-[50px] w-[50px] rounded-[50px] bg-[#E9DBFF]"/>
                                <h2>{session?.user?.name}</h2>
                            </div>
                            <h2 className="text-3xl font-bold text-white">Spaces</h2>
                            <ul>
                                <li className="text-xl text-white">
                                    <Link href={"/"}>
                                        JavaScript
                                    </Link>
                                </li>
                                <li className="text-xl text-white">
                                    <Link href={"/"}>
                                        Cooking
                                    </Link>
                                </li>
                                <li className="text-xl text-white">
                                    <Link href={"/"}>
                                        JavaScript
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <button
                            className="w-full py-3 text-white font-bold bg-[#B281F6] rounded-[10px]"
                            onClick={()=>signOut()}>
                        Log Out
                        </button>
                    </div>
                </SheetContent>
            </Sheet>
            <div className="hidden bg-gradient-to-b from-[#6E43B1] to-[#E9DBFF] w-full h-full md:flex md:flex-col md:justify-between p-5">
                <div className="flex flex-col gap-3">
                    <div className="flex gap-5 mb-3 items-center font-semibold text-xl text-white">
                        <img src={`${session?.user?.image}`} className="h-[50px] w-[50px] rounded-[50px] bg-[#E9DBFF]"/>
                        <h2>{session?.user?.name}</h2>
                    </div>
                    <h2 className="text-3xl font-bold text-white">Spaces</h2>
                    <ul>
                        {spaces?.map((space:any, index)=>{
                            return(
                                <li key={index} className="text-xl text-white">
                                    <Link href={`home/${space.space_id}`}>
                                        {space.name}
                                    </Link>
                                </li>
                            )
                        })}
                        {/* <li className="text-xl text-white">
                            <Link href={"/"}>
                                Cooking
                            </Link>
                        </li>
                        <li className="text-xl text-white">
                            <Link href={"/"}>
                                JavaScript
                            </Link>
                        </li> */}
                        <button className="my-5" onClick={createNewSpace}> Create Space +</button>
                    </ul>
                </div>
                <button
                    className="w-full py-3 text-white font-bold bg-[#B281F6] rounded-[10px]"
                    onClick={()=>signOut()}>
                Log Out
                </button>
            </div>
        </div>

    )
}