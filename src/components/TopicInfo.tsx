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


export default function TopicInfo(props:{ topicId:number, parentTopic:number }) {
  const { data: session, status } = useSession();
  const [parentTopicDetails, setParentTopicDetails] = useState({ id: props.parentTopic, name: "" });
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    if (status === "authenticated") {
      axios.get(`/api/get-spaces?id=${session?.user.id}`)
        .then(resp => {
          setTopics(resp.data);
          // Find the parent topic in the fetched topics to set its name
          const parentTopicData = resp.data.find((topic:any) => topic.topic_id === props.parentTopic);
          if (parentTopicData) {
            setParentTopicDetails({ id: props.parentTopic, name: parentTopicData.name });
          }
        });
    }
  }, [status, session?.user.id, props.parentTopic]);

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
        <IoIosInformationCircleOutline className="text-2xl"/>
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
          {topics.length > 0 && topics?.map((topic:any) => {
            if (topic.topic_id !== props.topicId) {
              return (
                <option key={topic.topic_id} value={topic.topic_id}>
                  {topic.name}
                </option>
              );
            }
          })}
        </select>
        <Link href={`${props.parentTopic}`} className="p-2 border-solid border-2 border-purple-400">Visit Parent</Link>
        <DialogTrigger>
            <button className="w-full p-2 bg-purple-400" onClick={updateParent}>Update Parent</button>
        </DialogTrigger>
      </DialogContent>
    </Dialog>
  );
}
