import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SlNote } from "react-icons/sl";
import axios from "axios";
import { DialogClose } from "@radix-ui/react-dialog";

export default function CreateNoteModal() {
    const [topic, setTopic] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [label, setLabel] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Topic:", topic);
        console.log("Title:", title);
        console.log("Description:", description);
        console.log("Label:", label);
    }

    return (
        <Dialog>
            <DialogTrigger className="px-4 py-2 rounded-lg bg-purple-300">
                <SlNote />
            </DialogTrigger>
            <DialogContent>
                <DialogClose asChild>
                    <button>Close</button>
                </DialogClose>
                <DialogHeader>
                    <DialogTitle>Create a New Note</DialogTitle>
                    <DialogDescription>
                        Please provide the details for your new note.
                    </DialogDescription>
                </DialogHeader>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <label>
                        Topic:
                        <input type="text" value={topic} onChange={e => setTopic(e.target.value)} />
                    </label>
                    <label>
                        Title:
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                    </label>
                    <label>
                        Description:
                        <textarea value={description} onChange={e => setDescription(e.target.value)} />
                    </label>
                    <label>
                        Optional Label:
                        <input type="text" value={label} onChange={e => setLabel(e.target.value)} />
                    </label>
                    <button type="submit">Create Note</button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
