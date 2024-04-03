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



export default function Popup(props:{spaceId:number, spaceName:string, toRender:()=>void}){
    const {push} = useRouter();

    const deleteSpace = () => {
        axios.post(`/api/delete-space?id=${props.spaceId}`)
          .then(function (response) {
            props.toRender();
            push("/home");
          })
          .catch(function (error) {
            console.log(error);
            alert("Uh Oh! We couldn't delete the topic.")
          });
    }

    return(
        <Dialog>
            <DialogTrigger><SlOptions /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Are you sure you want to delete {props.spaceName}?</DialogTitle>
                <DialogDescription>
                    This action cannot be undone. This will permanently delete the topic
                    from your account.
                </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose onClick={deleteSpace}>Delete Topic</DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )

}