import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import axios from "axios";
  import { useState } from "react";
  
  export function CreateTagInput(props: { user: string, toRender: () => void }) {
    const [tagName, setTagName] = useState<string>("");
  
    const createNewTag = () => {
      if (tagName.length > 0) {
        axios.post('/api/create-tag', {
            name: tagName,
            userId: props.user
          })
          .then(function (resp) {
            props.toRender();
            setTagName(""); 
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        alert("Please enter a name for your tag.")
      }
    }
  
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="flex justify-between text-white">
            <h2 className="text-3xl font-bold text-white">Tags</h2>
            <p className="text-3xl"> + </p>
          </AccordionTrigger>
          <AccordionContent className="grid grid-cols-4">
            <input 
              value={tagName} // Control the input with React state
              onChange={(e) => setTagName(e.target.value)} 
              type="text" 
              className="col-span-3 rounded-lg p-2 border-solid border-2 border-white bg-transparent mr-2 text-white focus:outline-none"
            />
            <AccordionTrigger 
              onClick={createNewTag} 
              className="col-span-1 p-2 bg-white text-black rounded-lg text-center font-bold"
            >
              Add
            </AccordionTrigger>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
  