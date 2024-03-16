import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SlLink } from "react-icons/sl";
import axios from "axios";
import { DialogClose } from "@radix-ui/react-dialog";

export default function CreateNoteModal() {
    const [link, setLink] = useState("");
    const [label, setLabel] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Link:", link);
        console.log("Label:", label);
        // Here you can process the link and label, such as validating or sending them to your backend
    };

    return (
        <Dialog>
            <DialogTrigger className="px-4 py-2 rounded-lg bg-purple-300">
                <SlLink />
            </DialogTrigger>
            <DialogContent>
                <DialogClose asChild>
                    <button>Close</button>
                </DialogClose>
                <DialogHeader>
                    <DialogTitle>Add a Link</DialogTitle>
                </DialogHeader>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <label>
                        Link:
                        <input type="text" value={link} onChange={e => setLink(e.target.value)} />
                    </label>
                    <label>
                        Label:
                        <input type="text" value={label} onChange={e => setLabel(e.target.value)} />
                    </label>
                    <button type="submit">Add Link</button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
