"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
  } from "@/components/ui/dialog"

import { GoPaperclip } from "react-icons/go";

import { DialogClose } from "@radix-ui/react-dialog";



export default function Popup(){

    return(
        <Dialog>
            <DialogTrigger className='px-4 py-2 bg-transparent rounded-lg font-bold border-solid border-2'><GoPaperclip /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Add a link!</DialogTitle>
                <DialogDescription className="flex flex-col gap-3">
                    <label htmlFor="linkTitle">Link Title</label>
                    <input id="linkTitle" type="text" placeholder="Google" className="focus:outline-none border-solid border-b-2 border-black"></input>
                    <label htmlFor="linkURL">Link URL</label>
                    <input id="linkURL" type="text" placeholder="https://google.com" className="focus:outline-none border-solid border-b-2 border-black"></input>
                </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose className="px-4 py-2 bg-purple-300 font-bold rounded-lg">Add Link</DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}