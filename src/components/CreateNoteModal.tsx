"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SlNote } from "react-icons/sl";
import axios from "axios";
import { DialogClose } from "@radix-ui/react-dialog";

export default function CreateNoteModal(props:{topicId:number}) {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.length <= 0 || text.length <= 0) {
            alert("Oh no! Something went wrong. Please try again ");
        }else{
            axios.post('/api/create-note', {
                topicId: props.topicId,
                title: title,
                text: text 
            })
            .then(resp=>console.log(resp))
        }
    }

    return (
        <Dialog>
            <DialogTrigger className="px-4 py-2 rounded-lg bg-purple-300">
                <SlNote />
            </DialogTrigger>
            <DialogContent>
                <DialogClose asChild>
                </DialogClose>
                <DialogHeader>
                    <DialogTitle>Create a New Note</DialogTitle>
                    <DialogDescription>
                        Please provide the details for your new note.
                    </DialogDescription>
                </DialogHeader>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                    <input type="text" className=" border-black border-b border-solid focus:outline-none" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                    <textarea className="border-black border h-[300px] resize-none focus:outline-none p-2" placeholder="what's on your mind?" value={text} onChange={e => setText(e.target.value)} />
                    <DialogClose asChild>
                        <button type="submit" className="bg-purple-300 text-black font-bold p-2">Create Note</button>
                    </DialogClose>
                </form>
            </DialogContent>
        </Dialog>
    )
}
