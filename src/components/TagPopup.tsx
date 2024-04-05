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

import { useRouter } from "next/navigation";

import { SlOptions } from "react-icons/sl";

import axios from "axios";
import { DialogClose } from "@radix-ui/react-dialog";



export default function TagPopup(props:{tagId:number, tagName:string, toRender:()=>void}){
    const {push} = useRouter();

    const deleteTag = () => {
        axios.delete(`/api/delete-tag?tag-id=${props.tagId}`)
          .then(function (response) {
            props.toRender();
            push("/home/tags");
          })
          .catch(function (error) {
            console.log(error);
            alert("Uh Oh! We couldn't delete the tag.")
          });
    }

    return(
        <Dialog>
            <DialogTrigger><SlOptions /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Are you sure you want to delete {props.tagName}?</DialogTitle>
                <DialogDescription>
                    This action cannot be undone. This will permanently delete the tag 
                    from your account.
                </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose onClick={deleteTag}>Delete Tag</DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )

}