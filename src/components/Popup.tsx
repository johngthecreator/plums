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

import { SlOptions } from "react-icons/sl";

import axios from "axios";
import { DialogClose } from "@radix-ui/react-dialog";



export default function Popup(props:{spaceId:number, spaceName:string, toRender:()=>void}){

    const deleteSpace = () => {
        axios.post(`/api/delete-space?id=${props.spaceId}`)
          .then(function (response) {
            props.toRender();
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return(
        <Dialog>
            <DialogTrigger><SlOptions /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Are you sure you want to delete {props.spaceName}?</DialogTitle>
                <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose onClick={deleteSpace}>Delete Space</DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )

}