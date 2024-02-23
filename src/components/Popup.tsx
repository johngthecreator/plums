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



export default function Popup(){
    return(
        <Dialog>
        <DialogTrigger><SlOptions /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <button type="submit">Save changes</button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )

}