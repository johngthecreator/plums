"use client";
import AddLinkModal from "@/components/AddLinkModal";
import CreateNoteModal from "@/components/CreateNoteModal";
import LinkPreview from "@/components/LinkPreview";
import NotePreview from "@/components/NotePreview";
import UploadFileModal from "@/components/UploadFileModal";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

export default async function Page({ params }: { params: { space: number } }){

    const getNotes = async () => {
        let resp = await fetch(`http://localhost:3000/api/get-notes?id=${params.space}`);
        let data = await resp.json();
        return data;
    }

    const getLinks = async () => {
        let resp = await fetch(`http://localhost:3000/api/get-links?id=${params.space}`);
        let data = await resp.json();
        return data;
    }


    const getSpaceData = async () => {
        let resp = await fetch(`http://localhost:3000/api/get-space?id=${params.space}`);
        let data = await resp.json();
        return data;
    }


    const spaceData = await getSpaceData();
    const notesData = await getNotes();
    const linksData = await getLinks();
    if(spaceData.status == 200 && notesData.status == 200){
        return (
            <div className="flex flex-col gap-5 text-black h-full p-3 max-h-screen md:p-5">
                <div className="flex flex-row items-center justify-between">
                    <h2 className="text-3xl font-bold"> {spaceData.body.name} </h2>
                    <div className="flex flex-row gap-3">
                        <CreateNoteModal topicId={params.space} />
                        <AddLinkModal topicId={params.space} />
                        <UploadFileModal />
                    </div>
                </div>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Notes</AccordionTrigger>
                        <AccordionContent>
                        <div className="masonry sm:masonry-sm justify-center overflow-y-scroll">
                            {notesData && notesData.body.map(note => {
                                return(
                                    <NotePreview key={note.note_id} title={note.title} text={note.text} noteId={note.note_id} />
                                )
                            })}
                        </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Links</AccordionTrigger>
                        <AccordionContent>
                        <div className="masonry sm:masonry-sm justify-center overflow-y-scroll">
                            {linksData && linksData.body.map(link => {
                                return(
                                    <LinkPreview key={link.link_id} title={link.title} link={link.url} description={link.description} linkId={link.link_id} />
                                )
                            })}
                        </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Is it animated?</AccordionTrigger>
                        <AccordionContent>
                        Yes. It's animated by default, but you can disable it if you prefer.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            )
    }
    return <h2 className="text-black">Loading...</h2>
}