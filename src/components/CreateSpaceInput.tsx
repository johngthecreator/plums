"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

  import axios from "axios";
import { useState } from "react";
   
  export function CreateSpaceInput(props:{user: string}) {
    const [name, setName] = useState<string>("");

    const createNewSpace = () => {
      if (name.length > 0){
        axios.post('/api/create-space', {
            spaceName: name,
            userId: props.user
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }else{
        alert("Please name your space.")
      }
    }
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-white">Create Space +</AccordionTrigger>
          <AccordionContent className="grid grid-cols-4">
            <input onChange={(e)=>setName(e.target.value)} type="text" className="col-span-3 rounded-lg p-2 border-solid border-2 border-white bg-transparent mr-2 text-white focus:outline-none"/>
            <AccordionTrigger onClick={createNewSpace} className="col-span-1 p-2 bg-white text-black rounded-lg text-center font-bold">add.</AccordionTrigger>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }