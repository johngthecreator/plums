"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import Link from "next/link";

export default function Page({ params }: { params: { tags: number } }){
    const [toRender, setToRerender] = useState<boolean>(false);
    const [tagTopics, setTagTopics] = useState<any>(null);

    const router = useRouter();

    useEffect(()=>{
        setToRerender(false);
        getTagTopics();
    },[toRender])

    const getTagTopics = () => {
        axios.get(`/api/get-tag-topics?tag-id=${params.tags}`)
        .then(resp=>setTagTopics(resp.data))
        .catch(error=>{
            console.error(error);
            alert("Sorry! That tag doesn't exist.");
            router.push("/home/tags")
            
        });
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
                            <Link key={topic.topic_id} className="w-full bg-purple-200 py-4 flex flex-row justify-center text-2xl font-bold" href={`/home/${topic.topic_id}`}>
                                {topic.name}
                            </Link>
                        )
                    })}
  
                </div>
            )
    }
    return <div className="w-full h-full flex justify-center items-center"><h2 className="text-purple-500 text-3xl font-bold">Loading...</h2></div>
}