"use client";
import AddLinkModal from "@/components/AddLinkModal";
import CreateNoteModal from "@/components/CreateNoteModal";
import NotePreview from "@/components/NotePreview";
import UploadFileModal from "@/components/UploadFileModal";

export default async function Page({ params }: { params: { space: number } }){

    const getNotes = async () => {
        let resp = await fetch(`http://localhost:3000/api/get-notes?id=${params.space}`);
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
    if(spaceData.status == 200 && notesData.status == 200){
        return (
            <div className="flex flex-col gap-5 text-black h-full p-3 max-h-screen md:p-5">
                <div className="flex flex-row items-center justify-between">
                    <h2 className="text-3xl font-bold"> {spaceData.body.name} </h2>
                    <div className="flex flex-row gap-3">
                        <CreateNoteModal topicId={params.space} />
                        <AddLinkModal />
                        <UploadFileModal />
                    </div>
                </div>
                <div className="masonry sm:masonry-sm justify-center overflow-y-scroll">
                    {notesData && notesData.body.map(note => {
                        return(
                            <NotePreview key={note.note_id} title={note.title} text={note.text} noteId={note.note_id} />
                        )
                    })}
                    {/* <NotePreview imgSrc="https://images.unsplash.com/photo-1708980049480-9a6447097a64?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" title="Fashion"/>
                    <NotePreview imgSrc="https://images.unsplash.com/photo-1707391474687-6fbda271617d?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" title="Nature"/>
                    <NotePreview imgSrc="https://images.unsplash.com/photo-1709002461508-408bdea0b5e9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8" title="Clouds"/> */}
                </div>
            </div>
            )
    }
    return <h2 className="text-black">Loading...</h2>
}