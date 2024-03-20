"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SlLink } from "react-icons/sl";
import axios from "axios";
import { DialogClose } from "@radix-ui/react-dialog";

export default function AddLinkModal(props:{topicId:number}) {
    const [link, setLink] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.length <= 0 || link.length <= 0 || description.length <= 0) {
            alert("Oh no! Something went wrong. Please try again ");
        }else{
            axios.post('/api/create-link', {
                topicId: props.topicId,
                title: title,
                text: link,
                description: description
            })
            .then(resp=>console.log(resp))
        }
    }

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
                    <input type="text" className=" border-black border-b border-solid focus:outline-none" placeholder="Link Description" value={description} onChange={e => setDescription(e.target.value)} />
                    <DialogClose asChild>
                    <button type="submit" className="bg-purple-300 text-black font-bold p-2">Add Link</button>
                    </DialogClose>
                </form>
            </DialogContent>
        </Dialog>
    );
}
