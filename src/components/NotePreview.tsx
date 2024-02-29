import Image from "next/image";

export default function NotePreview(props:{imgSrc:string, title:string, text?:string}) {
  return (
    <div className="w-full flex flex-col gap-2 p-3 bg-purple-500 rounded-xl mb-3 break-inside">
      <img src={props.imgSrc} className="w-full rounded-xl"/>
      <h2 className="font-bold text-2xl text-white">{props.title}</h2>
    </div>
  );
}
