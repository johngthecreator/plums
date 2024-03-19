"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SlPaperClip } from "react-icons/sl";
import axios from "axios";
import { DialogClose } from "@radix-ui/react-dialog";

export default function UploadFileModal() {
    const [file, setFile] = useState<File | null>(null);
    const [dataString, setDataString] = useState<string>("");
    const [title, setTitle] = useState<string>("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files && e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    const base64Data = reader.result.toString().split(",")[1];
                    setDataString(base64Data);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Dialog>
            <DialogTrigger className="px-4 py-2 rounded-lg bg-purple-300">
                <SlPaperClip />
            </DialogTrigger>
            <DialogContent>
                <DialogClose asChild>
                </DialogClose>
                <DialogHeader>
                    <DialogTitle>Attach a File</DialogTitle>
                </DialogHeader>
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <input type="text" className=" border-black border-b border-solid focus:outline-none" placeholder="File Title" value={title} onChange={e => setTitle(e.target.value)} />
                    <input type="file" className="p-3 border-black border-solid border-[1px]" onChange={handleFileChange} />
                    <button type="submit" className="bg-purple-300 text-black font-bold p-2">Upload File</button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
