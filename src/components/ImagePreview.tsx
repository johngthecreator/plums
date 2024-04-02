"use client";
import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SlLink } from "react-icons/sl";
import axios from "axios";
import { DialogClose, DialogDescription } from "@radix-ui/react-dialog";

export default function ImagePreview(props:{title:string, imageURL:string, imageId:number, passedFunc: ()=>void}) {
  const [imageURL, setImageURL] = useState<string>(`${props.imageURL}`)
  const [title, setTitle] = useState<string>(`${props.title}`);

//   const handleSubmit = (e: React.FormEvent) => {
//       e.preventDefault();
//       if (title.length <= 0 || imageURL.length <= 0) {
//           alert("Oh no! Something went wrong. Please try again ");
//       }else{
//           axios.post('/api/update-note', {
//               noteId: props.noteId,
//               title: title,
//               text: text 
//           })
//           .then(resp=>console.log(resp))
//       }
//   }

  const deleteNote = () => {
    axios.delete(`/api/delete-note?id=${props.imageId}`)
    .then(resp=>console.log(resp));
    props.passedFunc();
  }

  return (
        <Dialog>
            <DialogTrigger className="w-full">
              <div className="w-full flex flex-col gap-2 p-3 bg-purple-500 rounded-xl mb-3 break-inside">
                <h2 className="font-bold text-2xl text-white">{props.title}</h2>
              </div>
            </DialogTrigger>
            <DialogContent>
                <DialogClose asChild>
                </DialogClose>
                <form className="flex flex-col gap-2">
                    <input type="text" className=" border-black border-b border-solid focus:outline-none" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                    <Image src={imageURL} fill={true} alt={title} />
                    <DialogClose asChild>
                        <button type="submit" className="bg-purple-300 text-black font-bold p-2">Update Note</button>
                    </DialogClose>
                    <DialogClose asChild>
                        <button onClick={deleteNote} className="bg-red-300 text-black font-bold p-2">Delete</button>
                    </DialogClose>
                </form>
            </DialogContent>
        </Dialog>

  );
}
