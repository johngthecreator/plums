"use client";
import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SlLink } from "react-icons/sl";
import axios from "axios";
import { DialogClose, DialogDescription } from "@radix-ui/react-dialog";
import Link from "next/link";

export default function LinkPreview(props:{title:string, link:string, linkId:number, description:string, passedFunc:()=>void}) {
  const [link, setLink] = useState<string>(`${props.link}`)
  const [description, setDescription] = useState<string>(`${props.description}`)
  const [title, setTitle] = useState<string>(`${props.title}`);

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (title.length <= 0 || link.length <= 0 || description.length <= 0) {
          alert("Oh no! Something went wrong. Please try again ");
      }else{
          axios.post('/api/update-link', {
              linkId: props.linkId,
              title: title,
              url: link,
              description: description 
          })
          .then(resp=>console.log(resp))
      }
  }

  const deleteLink = () => {
    axios.delete(`/api/delete-link?id=${props.linkId}`)
    .then(resp=>console.log(resp));
    props.passedFunc();
  }

  console.log(link)

  return (
        <Dialog>
            <DialogTrigger className="w-full">
              <div className="w-full flex flex-col gap-2 p-3 bg-purple-500 rounded-xl mb-3 break-inside">
                <h2 className="font-bold text-2xl text-white">{props.title}</h2>
                <p className="line-clamp-2">{props.description}</p>
              </div>
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
                    <button type="submit" className="bg-purple-300 text-black font-bold p-2">Update Link</button>
                    </DialogClose>
                    <DialogClose asChild>
                    <a href={link} target="_blank" className="bg-purple-300 text-black font-bold p-2 text-center">Visit Link</a>
                    </DialogClose>
                    <DialogClose asChild>
                        <button onClick={deleteLink} className="bg-red-300 text-black font-bold p-2">Delete</button>
                    </DialogClose>
                </form>
            </DialogContent>
        </Dialog>

  );
}
