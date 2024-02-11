"use client";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { signOut } from "next-auth/react";
import Link from "next/link";

import { CgMenuGridO } from "react-icons/cg";


export default function Nav(props:{space: string}) {
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
                                <div className="h-[50px] w-[50px] rounded-[50px] bg-[#E9DBFF]"></div>
                                <h2>Jake Scott</h2>
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
                        <div className="h-[50px] w-[50px] rounded-[50px] bg-[#E9DBFF]"></div>
                        <h2>Jake Scott</h2>
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
        </div>

    )
}