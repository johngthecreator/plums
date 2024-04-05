import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#6E43B1] to-white">
        <header className="flex flex-row justify-between p-4">
          <h1 className="text-white text-3xl font-black ">plums.</h1>
          <Link href={"/login"} className="p-3 text-white font-bold bg-[#B281F6] rounded-[10px]">Get Learning</Link>
        </header>
        <div className="flex flex-col h-full p-7 gap-8 md:p-14">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <p className="text-white text-[50px]">Rethink your <br /> personal learning.</p>
            <Image src={"/notes.png"} alt="note cards" width={385} height={257}/>
          </div>
          <Link href={"/login"} className="p-3 text-center self-center md:self-start md:w-1/3 w-5/6 text-white font-bold bg-[#B281F6] rounded-[10px]">Get Learning</Link>
        </div>  
    </div>
  );
}
