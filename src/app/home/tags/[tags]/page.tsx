"use client";
import AddLinkModal from "@/components/AddLinkModal";
import CreateNoteModal from "@/components/CreateNoteModal";
import LinkPreview from "@/components/LinkPreview";
import NotePreview from "@/components/NotePreview";
import UploadFileModal from "@/components/UploadFileModal";
import { useState, useEffect } from "react";
import axios from "axios";

import Link from "next/link";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import ImagePreview from "@/components/ImagePreview";
import TopicInfo from "@/components/TopicInfo";
import { SessionProvider } from "next-auth/react";

export default function Page({ params }: { params: { tags: number } }){
    const [toRender, setToRerender] = useState<boolean>(false);
    const [tagTopics, setTagTopics] = useState<any>(null);

    useEffect(()=>{
        setToRerender(false);
        getTagTopics();
    },[toRender])

    const getTagTopics = () => {
        axios.get(`/api/get-tag-topics?tag-id=${params.tags}`)
        .then(resp=>setTagTopics(resp.data));
    }


    if(tagTopics){
        return (
                <div className="flex flex-col gap-2 text-black h-full p-3 max-h-screen md:p-5 overflow-y-scroll no-scrollbar">
                    <h2 className="font-bold text-3xl">Topics</h2>
                    {tagTopics.length <=0 && 
                    <div className="w-full h-full flex justify-center items-center">
                        <h2 className="text-xl text-center"><span className="text-4xl font-bold">Oh weird...</span><br/> looks like no topics are connected...</h2>
                    </div>
                    }
                    {tagTopics.length > 0 && tagTopics.map((topic:any)=>{
                        return(
                            <Link className="w-full bg-purple-200 py-4 flex flex-row justify-center text-2xl font-bold" href={`/home/${topic.topic_id}`}>
                                {topic.name}
                            </Link>
                        )
                    })}
  
                </div>
            )
    }
    return <div className="w-full h-full flex justify-center items-center"><h2 className="text-purple-500 text-3xl font-bold">Loading...</h2></div>
}