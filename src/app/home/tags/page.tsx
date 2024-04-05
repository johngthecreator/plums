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
    return (
      <div className="w-full h-full flex justify-center items-center">
        <h2 className="text-purple-500 text-3xl font-bold text-center">Click on a tag or make one to get started!</h2>
      </div>
    )
}