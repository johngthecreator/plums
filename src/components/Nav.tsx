"use client";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

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
                    <h2>Link</h2>
                </SheetContent>
            </Sheet>
            <div className="hidden bg-gradient-to-b from-[#6E43B1] to-[#E9DBFF] w-full h-full md:flex md:flex-col p-5">
                <h2>Link</h2>
                <h2>Link</h2>

            </div>
        </div>

    )
}