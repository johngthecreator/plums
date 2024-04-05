"use client";
import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SlLink } from "react-icons/sl";
import axios from "axios";
import { DialogClose, DialogDescription } from "@radix-ui/react-dialog";

export default function NotePreview(props:{title:string, text:string, noteId:number, passedFunc: ()=>void}) {
  const [text, setText] = useState<string>(`${props.text}`)
  const [title, setTitle] = useState<string>(`${props.title}`);

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (title.length <= 0 || text.length <= 0) {
          alert("Oh no! Something went wrong. Please try again ");
      }else{
          axios.post('/api/update-note', {
              noteId: props.noteId,
              title: title,
              text: text 
          })
          .then(resp=>console.log(resp))
          .catch(error => console.error(error));
          props.passedFunc();
      }
  }

  const deleteNote = () => {
    axios.delete(`/api/delete-note?id=${props.noteId}`)
    .then(resp=>console.log(resp));
    props.passedFunc();
  }

  return (
        <Dialog>
            <DialogTrigger className="w-full">
              <div className="w-full flex flex-col gap-2 p-3 bg-purple-500 rounded-xl mb-3 break-inside">
                <h2 className="font-bold text-2xl text-white">{props.title}</h2>
                <p className="line-clamp-2">{props.text}</p>

              </div>
            </DialogTrigger>
            <DialogContent>
                <DialogClose asChild>
                </DialogClose>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                    <input type="text" className=" border-black border-b border-solid focus:outline-none" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                    <textarea className="border-black border h-[300px] resize-none focus:outline-none p-2" placeholder="what's on your mind?" value={text} onChange={e => setText(e.target.value)} />
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
