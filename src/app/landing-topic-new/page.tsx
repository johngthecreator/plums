// pages/landing-topic-new.tsx
export default function LandingTopicNewPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Sidebar */}
      <div className="w-30% flex flex-col justify-between items-center text-white" style={{background: "linear-gradient(to bottom, #6E43B1, white)"}}>
        <div className="flex flex-col items-center">
          <img src="/path/to/contact_picture.jpg" alt="Contact" className="w-16 h-16 rounded-full mt-4" />
          <p>Jake Scott</p>
          <h2 className="text-lg font-semibold mt-4 mb-2">Recent</h2>
          <ul className="text-sm">
            <li><a href="#">Placeholder JavaScript</a></li>
            <li><a href="#">Call Stack</a></li>
            <li><a href="#">Mental Health</a></li>
            <li><a href="#">Time Management</a></li>
          </ul>
          <a href="#" className="text-light-blue-400 mt-2 rounded-full px-2 py-1">+ New Topic</a>
        </div>
        <button className="bg-[#6E43B1] text-white py-2 px-4 mb-4 rounded-full">Logout</button>
      </div>
      
      {/* Main Content */}
      <div className="w-45% bg-white p-8">
        <div className="flex flex-col h-full">
          {/* Card 1 */}
          <div className="flex-1 border-b border-gray-200 pb-4 pt-10">
            <div className="flex items-center">
              <img src="/path/to/image1.jpg" alt="Image 1" className="w-20% rounded-lg mr-4" />
              <div>
                <div className="flex justify-between mb-2">
                  <h3 className="text-lg font-semibold">Placeholder Title</h3>
                  <p>{new Date().toLocaleDateString()}</p>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vulputate velit at nunc consectetur dapibus.</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex-1 border-b border-gray-200 pb-4 pt-10">
            <div className="flex items-center">
              <img src="/path/to/image2.jpg" alt="Image 2" className="w-20% rounded-lg mr-4" />
              <div>
                <div className="flex justify-between mb-2">
                  <h3 className="text-lg font-semibold">Placeholder Title</h3>
                  <p>{new Date().toLocaleDateString()}</p>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vulputate velit at nunc consectetur dapibus.</p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex-1 border-b border-gray-200 pb-4 pt-10">
            <div className="flex items-center">
              <img src="/path/to/image3.jpg" alt="Image 3" className="w-20% rounded-lg mr-4" />
              <div>
                <div className="flex justify-between mb-2">
                  <h3 className="text-lg font-semibold">Placeholder Title</h3>
                  <p>{new Date().toLocaleDateString()}</p>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vulputate velit at nunc consectetur dapibus.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Sidebar */}
      <div className="w-25% bg-gray-100 p-8 flex flex-col" style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
        <input type="text" className="border-0 bg-transparent rounded-md p-2 mb-4" placeholder="Enter text..." />
        <div className="flex justify-between">
          <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l9-9 9 9-9 9-9-9zm9 3v-9" />
            </svg>
          </button>
          <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>
          <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
