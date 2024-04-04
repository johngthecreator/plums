"use client";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"

import { Skeleton } from "@/components/ui/skeleton"


import { useEffect, useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { SessionProvider, signOut } from "next-auth/react";
import Link from "next/link";
import axios from "axios";
import Popup from "./Popup";
import { CreateSpaceInput } from "./CreateSpaceInput";
import { CreateTagsInput } from "./CreateTagsInput";


export default function Nav(props:{session:any}) {
    const [spaces, setSpaces] = useState([]);
    const [toRender, setToRerender] = useState<boolean>(false);

    useEffect(()=>{
        getSpaces();
        setToRerender(false);
    },[toRender])


    const getSpaces = () => {
        axios.get(`/api/get-spaces?id=${props.session.user.id}`)
        .then((resp) => {
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
                    <h2 className="font-bold text-2xl text-white">plums</h2>
                    
                </div>
                <SheetContent side={"left"} className="flex flex-col p-5 bg-gradient-to-b from-[#6E43B1] to-[#E9DBFF]">
                    <div className="flex flex-col justify-between w-full h-full">
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-5 mb-3 items-center font-semibold text-xl text-white">
                                <img src={`${props.session.user.image}`} className="h-[50px] w-[50px] rounded-[50px] bg-[#E9DBFF]"/>
                                <h2>{props.session.user.name}</h2>
                            </div>
                            <div className="max-h-[75vh] flex flex-col overflow-y-scroll no-scrollbar">
                                <CreateSpaceInput user={props.session.user.id} toRender={()=>setToRerender(true)} />
                                <ul>
                                    {(spaces.length > 0) ? (spaces?.map((space:any, index)=>{
                                        return(
                                            <li key={index} className="flex justify-between text-xl text-white">
                                                <Link href={`/home/${space.topic_id}`}>
                                                    {space.name}
                                                </Link>
                                                <Popup spaceId={space.topic_id} spaceName={space.name} toRender={()=>setToRerender(true)}/>
                                            </li>
                                        )
                                    })):(
                                        <div>
                                            {/* <Skeleton className="h-4 w-5/6" />
                                            <Skeleton className="h-4 w-3/4" /> */}
                                            <h2>Looks like you don&#39;t </h2>
                                            <h2>have any topics yet...</h2>
                                        </div>
                                    )}
                                </ul>


                                <CreateSpaceInput user={props.session.user.id} toRender={()=>setToRerender(true)} />
                                <ul>
                                    {(spaces.length > 0) ? (spaces?.map((space:any, index)=>{
                                        return(
                                            <li key={index} className="flex justify-between text-xl text-white">
                                                <Link href={`/home/${space.topic_id}`}>
                                                    {space.name}
                                                </Link>
                                                <Popup spaceId={space.topic_id} spaceName={space.name} toRender={()=>setToRerender(true)}/>
                                            </li>
                                        )
                                    })):(
                                        <div>
                                            {/* <Skeleton className="h-4 w-5/6" />
                                            <Skeleton className="h-4 w-3/4" /> */}
                                            <h2>Looks like you don&#39;t </h2>
                                            <h2>have any topics yet...</h2>
                                        </div>
                                    )}
                                </ul>

                            </div>
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
                        <img src={`${props.session.user.image}`} className="h-[50px] w-[50px] rounded-[50px] bg-[#E9DBFF]"/>
                        <h2>{props.session.user.name}</h2>
                    </div>
                    <div className="max-h-[75vh] flex flex-col overflow-y-scroll no-scrollbar">
                        <CreateSpaceInput user={props.session.user.id} toRender={()=>setToRerender(true)} />
                        <ul>
                            {(spaces.length > 0) ? (spaces?.map((space:any, index)=>{
                                return(
                                    <li key={index} className="flex justify-between text-xl text-white">
                                        <Link href={`/home/${space.topic_id}`}>
                                            {space.name}
                                        </Link>
                                        <Popup spaceId={space.topic_id} spaceName={space.name} toRender={()=>setToRerender(true)}/>
                                    </li>
                                )
                            })):(
                                <div>
                                    {/* <Skeleton className="h-4 w-5/6" />
                                    <Skeleton className="h-4 w-3/4" /> */}
                                    <h2>Looks like you don&#39;t </h2>
                                    <h2>have any topics yet...</h2>
                                </div>
                            )}
                        </ul>


                        <CreateTagsInput user={props.session.user.id} toRender={()=>setToRerender(true)} />
                        <ul>
                            {(spaces.length > 0) ? (spaces?.map((space:any, index)=>{
                                return(
                                    <li key={index} className="flex justify-between text-xl text-white">
                                        <Link href={`/home/${space.topic_id}`}>
                                            {space.name}
                                        </Link>
                                        <Popup spaceId={space.topic_id} spaceName={space.name} toRender={()=>setToRerender(true)}/>
                                    </li>
                                )
                            })):(
                                <div>
                                    {/* <Skeleton className="h-4 w-5/6" />
                                    <Skeleton className="h-4 w-3/4" /> */}
                                    <h2>Looks like you don&#39;t </h2>
                                    <h2>have any tags yet...</h2>
                                </div>
                            )}
                        </ul>

                    </div>
                </div>
                <button
                    className="w-full py-3 text-white font-bold bg-[#B281F6] rounded-[10px]"
                    onClick={()=>signOut({redirect: true, callbackUrl: "/login"})}>
                Log Out
                </button>
            </div>
        </div>
    )
}