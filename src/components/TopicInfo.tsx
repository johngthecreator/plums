import { useState, useEffect } from "react";
import axios from "axios";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useSession } from "next-auth/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";

import Link from "next/link";


export default function TopicInfo(props: { topicId: number, parentTopic: number, topicData: any }) {

    const { data: session, status } = useSession();
    const [parentTopicDetails, setParentTopicDetails] = useState({ id: props.parentTopic, name: "" });
    const [topics, setTopics] = useState<any[]>([]);
    const [availTags, setAvailTags] = useState<any[]>([]);
    const [tags, setTags] = useState<any[]>(props.topicData.tags || []);
    const [selectedTag, setSelectedTag] = useState<any | null>(null);


    useEffect(() => {
        if (status === "authenticated") {
            axios.get(`/api/get-spaces?id=${session?.user.id}`)
                .then(resp => {
                    setTopics(resp.data);
                    const parentTopicData = resp.data.find((topic: any) => topic.topic_id === props.parentTopic);
                    if (parentTopicData) {
                        setParentTopicDetails({ id: props.parentTopic, name: parentTopicData.name });
                    }
                });
            axios.get(`/api/get-all-tags?id=${session?.user.id}`)
                .then(resp => {
                    setAvailTags(resp.data);
                });
        }
    }, [status, session?.user.id, props.parentTopic]);

    const addTag = () => {
        if (selectedTag && !tags.some(tag => tag.tag_id === selectedTag.tag_id)) {
            axios.post(`/api/topic-tags`, {
                topicId: props.topicId,
                tagIds: [selectedTag.tag_id],
                action: 'attach'
            })
            .then(() => {
                setTags(prev => [...prev, selectedTag]);
                setSelectedTag(null);
            })
            .catch(console.error);
        } else {
            alert("This tag is already added to the topic.");
        }
    };

    const removeTag = (tagId: number) => {
        axios.post(`/api/topic-tags`, { 
            topicId: props.topicId, 
            tagIds: [tagId], 
            action: 'remove' 
        })
        .then(() => {
            setTags(prev => prev.filter(tag => tag.tag_id !== tagId));
        })
        .catch(console.error);
    };

    const handleTagSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const tagId = e.target.value;
        const tag = availTags.find(t => t.tag_id.toString() === tagId);
        if (tag) {
            setSelectedTag(tag);
        }
    };

    const updateParent = () => {
        axios.post("/api/update-parent", {
            topicId: props.topicId,
            parentId: parentTopicDetails.id,
        })
            .then(resp => console.log(resp.data))
            .catch(error => console.error('Error updating topic parent:', error.response ? error.response.data : error.message));
    };

    return (
        <Dialog>
            <DialogTrigger>
                <IoIosInformationCircleOutline className="text-2xl" />
            </DialogTrigger>
            <DialogContent>
                <DialogClose asChild></DialogClose>
                <DialogHeader>
                    <DialogTitle>Topic Details</DialogTitle>
                </DialogHeader>
                <label className="font-bold" htmlFor="parentTopic">Parent Topic</label>
                <select id="parentTopic" value={parentTopicDetails.id} onChange={e => setParentTopicDetails({ id: parseInt(e.target.value), name: e.target.options[e.target.selectedIndex].text })}>
                    <option value={parentTopicDetails.id}>
                        {parentTopicDetails.name ? `${parentTopicDetails.name}` : "No Parent Topic"}
                    </option>
                    {topics.length > 0 && topics?.map((topic: any) => {
                        if (topic.topic_id != props.topicId) {
                            return (
                                <option key={topic.topic_id} value={topic.topic_id}>
                                    {topic.name}
                                </option>
                            );
                        }
                    })}
                </select>
                <div className="grid grid-cols-2 gap-2 pb-3 border-b-2">
                    <Link href={`${parentTopicDetails.id}`} className="p-2 text-center border">Visit Parent</Link>
                    <DialogTrigger>
                        <button className="w-full bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4" onClick={updateParent}>Update Parent</button>
                    </DialogTrigger>
                </div>
                <label className="font-bold" htmlFor="tags">Add Tags</label>
                <div className="grid grid-cols-2 gap-2">
                    <select 
                        id="tags" 
                        className="p-2 border border-gray-300"
                        onChange={handleTagSelection}
                        value={selectedTag ? selectedTag.tag_id : ""}
                    >
                        <option value="">Select a tag</option>
                        {availTags.map((tag: any) => (
                            <option key={tag.tag_id} value={tag.tag_id}>
                                {tag.name}
                            </option>
                        ))}
                    </select>
                    <button 
                        onClick={addTag} 
                        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4"
                    >
                        Add Tag
                    </button>
                </div>

                <h2>Tags</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag: any) => (
                        <div key={tag.tag_id} className="flex items-center bg-purple-200 text-purple-800 p-2">
                            {tag.name}
                            <button 
                                className="ml-2 text-purple-600 hover:text-purple-800" 
                                onClick={() => removeTag(tag.tag_id)}
                            >
                                x
                            </button>
                        </div>
                    ))}
                </div>

            </DialogContent>
        </Dialog>
    );
}
