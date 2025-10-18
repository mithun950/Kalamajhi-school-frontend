import React, { useState, useEffect, useRef } from "react";

const LatestNoticesWithImage = () => {
  const [notices, setNotices] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  useEffect(() => {
    fetch("https://kalamajhi-high-school-backend.vercel.app/api/notices")
      .then((res) => res.json())
      .then((data) => setNotices(data))
      .catch((err) => console.error(err));
  }, []);

  // Sort notices by date descending and take latest 10
  const latestNotices = notices
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);

  // Duplicate notices for seamless scroll
  const duplicatedNotices = [...latestNotices, ...latestNotices];

  // Scroll speed (pixels per 30ms)
  const scrollSpeed = 1;

  // Start scrolling function
  const startScrolling = () => {
    if (scrollIntervalRef.current) return; // already running

    scrollIntervalRef.current = setInterval(() => {
      if (!containerRef.current || !contentRef.current) return;

      // current scroll position
      const scrollTop = containerRef.current.scrollTop;
      // height of one set of notices (half content)
      const singleContentHeight = contentRef.current.scrollHeight / 2;

      if (scrollTop >= singleContentHeight) {
        // reset scroll to top seamlessly
        containerRef.current.scrollTop = 0;
      } else {
        // scroll down by scrollSpeed px
        containerRef.current.scrollTop = scrollTop + scrollSpeed;
      }
    }, 30); // 30 ms interval for smoothness
  };

  // Stop scrolling function
  const stopScrolling = () => {
    clearInterval(scrollIntervalRef.current);
    scrollIntervalRef.current = null;
  };

  // Start scroll when notices load
  useEffect(() => {
    if (duplicatedNotices.length > 0) {
      startScrolling();
    }
    // cleanup on unmount
    return () => stopScrolling();
  }, [duplicatedNotices.length]);

  // Handle notice click
  const handleNoticeClick = (e, notice) => {
    e.preventDefault();
    setSelectedNotice(notice);
    stopScrolling();
  };

  // Close modal
  const closeModal = () => {
    setSelectedNotice(null);
    startScrolling();
  };

  return (
    <div className="w-11/12 mt-20 mx-auto p-6 md:p-8 bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-400 rounded-2xl shadow-2xl">
      <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8 relative">
        {/* Left side image */}
        <div className="flex-shrink-0 w-full md:w-1/3 z-10 relative">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent drop-shadow-lg animate-pulse">
            📢 Our Latest Notices
          </h2>
          <div className="relative group">
            <img
              src="https://png.pngtree.com/png-vector/20250217/ourmid/pngtree-megaphone-3d-cartoon-style-blue-and-white-realistic-hand-grip-yellow-png-image_15469689.png"
              alt="Notice Board"
              className="rounded-2xl object-cover w-full h-48 md:h-[400px] shadow-xl transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
        </div>

        {/* Right side scrolling notices */}
        <div
          ref={containerRef}
          onMouseEnter={stopScrolling}
          onMouseLeave={startScrolling}
          className="w-full md:w-2/3 h-64 md:h-[500px] overflow-hidden rounded-2xl border-4 border-white bg-gradient-to-br from-yellow-200 to-yellow-300 relative shadow-2xl"
          style={{ overflowY: "auto", scrollbarWidth: "none" }}
        >
          {/* Hide scrollbar for webkit browsers */}
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          <ul ref={contentRef} className="space-y-3 p-4">
            {duplicatedNotices.length === 0 ? (
              <li className="text-center text-gray-700 font-semibold py-8">
                No latest notices found.
              </li>
            ) : (
              duplicatedNotices.map((notice, idx) => (
                <li
                  key={`${notice._id}-${idx}`}
                  className="bg-white p-4 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] cursor-pointer border-l-4 border-indigo-500"
                  onClick={(e) => handleNoticeClick(e, notice)}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">📌</span>
                    <div className="flex-1">
                      <h3 className="text-indigo-700 font-bold hover:text-indigo-900 transition-colors text-base md:text-lg">
                        {notice.title}
                      </h3>
                      <p className="text-gray-600 mt-2 text-xs md:text-sm flex items-center gap-2">
                        <span>📅</span>
                        {new Date(notice.date).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <span className="text-indigo-500 text-xl flex-shrink-0">→</span>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      {/* Modal for full notice view */}
      {selectedNotice && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold mb-2">
                  {selectedNotice.title}
                </h2>
                <p className="text-indigo-100 text-sm flex items-center gap-2">
                  <span>📅</span>
                  {new Date(selectedNotice.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="text-white hover:text-red-200 text-3xl font-bold transition-colors ml-4 hover:rotate-90 transform duration-300"
              >
                ✕
              </button>
            </div>

            {/* Modal Body - PDF Viewer */}
            <div className="p-0 overflow-auto max-h-[calc(90vh-140px)]">
              {selectedNotice.fileContent ? (
                <iframe
                  src={selectedNotice.fileContent}
                  className="w-full h-[70vh] border-0"
                  title="Notice PDF"
                />
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <p className="text-xl mb-4">📄</p>
                  <p>No file content available for this notice.</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 p-4 flex justify-between items-center border-t">
              <a
                href={selectedNotice.fileContent}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold shadow-md hover:shadow-lg transform hover:scale-105 duration-300"
              >
                📥 Open in New Tab
              </a>
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold shadow-md hover:shadow-lg transform hover:scale-105 duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add animations CSS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LatestNoticesWithImage;