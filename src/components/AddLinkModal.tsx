"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SlLink } from "react-icons/sl";
import axios from "axios";
import { DialogClose } from "@radix-ui/react-dialog";

export default function AddLinkModal() {
    const [link, setLink] = useState<string>("");
    const [title, setTitle] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Link:", link);
        console.log("title:", title);
        // Here you can process the link and label, such as validating or sending them to your backend
    };

    return (
        <Dialog>
            <DialogTrigger className="px-4 py-2 rounded-lg bg-purple-300">
                <SlLink />
            </DialogTrigger>
            <DialogContent>
                <DialogClose asChild>
                </DialogClose>
                <DialogHeader>
                    <DialogTitle>Add a Link</DialogTitle>
                </DialogHeader>
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <input type="text" className=" border-black border-b border-solid focus:outline-none" placeholder="Link Title" value={title} onChange={e => setTitle(e.target.value)} />
                    <input type="text" className=" border-black border-b border-solid focus:outline-none" placeholder="Link URL" value={link} onChange={e => setLink(e.target.value)} />
                    <button type="submit" className="bg-purple-300 text-black font-bold p-2">Add Link</button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
