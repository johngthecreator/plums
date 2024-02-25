// pages/home.tsx
import { signOut } from "next-auth/react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Sidebar */}
      <div className="w-20% bg-gradient-to-b from-[#6E43B1] to-white flex flex-col justify-between items-center text-white">
        <div className="flex flex-col items-center">
          <img src="/path/to/contact_picture.jpg" alt="Contact" className="w-16 h-16 rounded-full mt-4" />
          <p>Jake Scott</p>
          <h2 className="text-lg font-semibold mt-4 mb-2">Recent</h2>
          <ul className="text-sm text-white">
            <li><a href="#">Placeholder JavaScript</a></li>
            <li><a href="#">Call Stack</a></li>
            <li><a href="#">Mental Health</a></li>
            <li><a href="#">Time Management</a></li>
          </ul>
          <a href="#" className="text-white mt-2">+ New Topic</a>
        </div>
        <button className="bg-[#6E43B1] text-white py-2 px-6 rounded-full mb-4">Logout</button>
      </div>
      
      {/* Main Content */}
      <div className="w-80% flex flex-col justify-center items-center">
        <div className="bg-white text-[#6E43B1] p-8 flex flex-col items-center justify-center h-full">
          <h1 className="text-6xl font-semibold mb-4">Plums</h1>
          <p className="mb-4">Click a link to get started.</p>
          <button className="bg-[#6E43B1] text-white py-2 px-6 rounded-full mb-4">New Topic</button>
        </div>
      </div>
    </div>
  );
}
