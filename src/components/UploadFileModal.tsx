import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SlPaperClip } from "react-icons/sl";
import axios from "axios";
import { DialogClose } from "@radix-ui/react-dialog";

export default function CreateNoteModal() {
    const [file, setFile] = useState<File | null>(null);
    const [label, setLabel] = useState("");

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
                    console.log("Base64 Encoded File:", base64Data);
                }
            };
            reader.readAsDataURL(file);
        }
        console.log("Label:", label);
    };

    return (
        <Dialog>
            <DialogTrigger className="px-4 py-2 rounded-lg bg-purple-300">
                <SlPaperClip />
            </DialogTrigger>
            <DialogContent>
                <DialogClose asChild>
                    <button>Close</button>
                </DialogClose>
                <DialogHeader>
                    <DialogTitle>Attach a File</DialogTitle>
                </DialogHeader>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <label>
                        Attach File:
                        <input type="file" onChange={handleFileChange} />
                    </label>
                    <label>
                        Label:
                        <input type="text" value={label} onChange={e => setLabel(e.target.value)} />
                    </label>
                    <button type="submit">Upload</button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
