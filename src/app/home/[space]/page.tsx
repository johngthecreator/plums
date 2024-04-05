"use client";
import AddLinkModal from "@/components/AddLinkModal";
import CreateNoteModal from "@/components/CreateNoteModal";
import LinkPreview from "@/components/LinkPreview";
import NotePreview from "@/components/NotePreview";
import UploadFileModal from "@/components/UploadFileModal";
import { useState, useEffect } from "react";
import axios from "axios";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import ImagePreview from "@/components/ImagePreview";
import TopicInfo from "@/components/TopicInfo";
import { SessionProvider } from "next-auth/react";

export default function Page({ params }: { params: { space: number } }){
    const [toRender, setToRerender] = useState<boolean>(false);
    const [spaceData, setSpaceData] = useState<any>(null);
    const [notesData, setNotesData] = useState<any>(null);
    const [linksData, setLinksData] = useState<any>(null);
    const [imagesData, setImagesData] = useState<any>(null);

    useEffect(()=>{
        setToRerender(false);
        getSpaceData();
        getNotes();
        getLinks();
        getImages();
    },[toRender])

    const getNotes = () => {
        axios.get(`/api/get-notes?id=${params.space}`)
        .then(resp=>setNotesData(resp.data));
    }

    const getImages = () => {
        axios.get(`/api/get-images?id=${params.space}`)
        .then(resp=>setImagesData(resp.data));
    }

    const getLinks = () => {
        axios.get(`/api/get-links?id=${params.space}`)
        .then(resp=>setLinksData(resp.data));
    }


    const getSpaceData = () => {
        axios.get(`/api/get-space?id=${params.space}`)
        .then(resp => setSpaceData(resp.data.body));
    }


    if (spaceData?.success == false) {
        return <div className="w-full h-full flex justify-center items-center gap-3 text-center"><h2 className="text-2xl"><span className="text-black text-3xl font-bold">Sorry!</span> <br />This topic doesn't exist.</h2></div>
    }else if(spaceData && notesData && imagesData && linksData ){
        return (
            <SessionProvider>
                <div className="flex flex-col gap-5 text-black h-full p-3 max-h-screen md:p-5">
                    <div className="flex flex-col gap-3 md:flex-row items-start md:items-center justify-between">
                        <div className="flex items-center gap-3">
                            <h2 className="text-3xl font-bold"> {spaceData.name} </h2>
                            <TopicInfo topicId={params.space} parentTopic={spaceData.parentId} topicData={spaceData} />
                        </div>
                        <div className="flex flex-row gap-3">
                            <CreateNoteModal topicId={params.space} passedFunc={()=>setToRerender(true)} />
                            <AddLinkModal topicId={params.space} passedFunc={()=>setToRerender(true)} />
                            <UploadFileModal topicId={params.space} passedFunc={()=>setToRerender(true)} />
                        </div>
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="w-full bg-purple-200 mb-2 flex flex-row justify-center text-2xl font-bold">Notes</AccordionTrigger>
                            <AccordionContent>
                            <div className="masonry sm:masonry-sm justify-center overflow-y-scroll">
                                {notesData && notesData.body.map((note: any) => {
                                    return(
                                        <NotePreview key={note.note_id} title={note.title} text={note.text} noteId={note.note_id} passedFunc={()=>setToRerender(true)} />
                                    )
                                })}
                                {notesData.body <= 0 && 
                                (<h2 className="text-xl font-semibold">Nothing here...</h2>)
                                }
                            </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger className="w-full bg-purple-200 mb-2 flex flex-row justify-center text-2xl font-bold">Links</AccordionTrigger>
                            <AccordionContent>
                            <div className="masonry sm:masonry-sm justify-center overflow-y-scroll">
                                {linksData && linksData.body.map((link: any) => {
                                    return(
                                        <LinkPreview key={link.link_id} title={link.title} link={link.url} description={link.description} linkId={link.link_id} passedFunc={()=>setToRerender(true)} />
                                    )
                                })}
                                {linksData.body <= 0 && 
                                (<h2 className="text-xl font-semibold">Nothing here...</h2>)
                                }
                            </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger className="w-full bg-purple-200 mb-2 flex flex-row justify-center text-2xl font-bold">Images</AccordionTrigger>
                            <AccordionContent>
                            <div className="masonry sm:masonry-sm justify-center overflow-y-scroll">
                                {imagesData && imagesData.body.map((image: any) => {
                                    return(
                                        <ImagePreview key={image.image_id} title={image.title} imageURL={image.imageData} imageId={image.image_id} passedFunc={()=>setToRerender(true)} />
                                    )
                                })}
                                {imagesData.body <= 0 && 
                                (<h2 className="text-xl font-semibold">Nothing here...</h2>)
                                }
                            </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </SessionProvider>
            )
    }
    return <div className="w-full h-full flex justify-center items-center"><h2 className="text-purple-500 text-3xl font-bold">Loading...</h2></div>
}