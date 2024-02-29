"use client";
import { useState } from 'react';
import { CiImageOn } from "react-icons/ci";
import { GoPaperclip } from "react-icons/go";


import { useSearchParams } from 'next/navigation';
import LinkAddPopup from '@/components/LinkAddPopup';
export default function CreateNotes({ params }: { params: { space: number }}){
    const searchParams = useSearchParams()
    const name = searchParams.get('name')
    return(
        <div className='h-full flex flex-col justify-between p-4'>
            <div>
                <h2 className='font-bold text-xl md:text-2xl'>New Note in {name}</h2>
                <textarea placeholder="What are you thinking?" className='focus:outline-none h-1/2 resize-none'></textarea> 
            </div>
           <div className='flex flex-row justify-between gap-3'>
                <button className='px-4 py-2 bg-purple-300 rounded-lg font-bold'>Discard</button>
                <div className='flex flex-row items-center justify-center gap-2'>
                    <LinkAddPopup />
                    <button className='px-4 py-2 bg-transparent rounded-lg font-bold border-solid border-2'><CiImageOn /></button>
                    <button className='px-4 py-2 bg-purple-300 rounded-lg font-bold'>Save</button>
                </div>
           </div>

        </div>
    )
}
