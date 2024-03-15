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

import { SlNote } from "react-icons/sl";

import axios from "axios";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";



export default function CreateNoteModal() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = () => {
        console.log(username);
        console.log(password);
    }

    return (
        <Dialog>
            <DialogTrigger className="px-4 py-2 rounded-lg bg-purple-300">
                <SlNote />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={e=>setUsername(e.target.value)} />
                    </label>
                    <label>
                        Password:
                        <input type="text" value={password} onChange={e=>setPassword(e.target.value)} />
                    </label>
                    <button type="submit">Create Note</button>
                </form>
            </DialogContent>
        </Dialog>
    )
}