import React, { useState, useEffect, useRef } from "react";

const LatestNoticesWithImage = () => {
  const [notices, setNotices] = useState([]);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/notices")
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

  return (
    <div className="w-11/12 mt-20 mx-auto p-5 bg-yellow-500 rounded-lg">
      

      <div className="flex flex-col md:flex-row items-start gap-6 relative">
        {/* Left side image on top */}
        <div className="flex-shrink-0 w-full md:w-1/3 z-10 relative">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
       Our Latest Notices
      </h2>
          <img
            src="https://png.pngtree.com/png-vector/20250217/ourmid/pngtree-megaphone-3d-cartoon-style-blue-and-white-realistic-hand-grip-yellow-png-image_15469689.png"
            alt="Notice Board"
            className="rounded-lg object-cover w-full h-48 md:h-[400px]"
          />
        </div>

        {/* Right side scrolling notices */}
        <div
          ref={containerRef}
          onMouseEnter={stopScrolling}
          onMouseLeave={startScrolling}
          className="w-full md:w-2/3 h-48 md:h-[500px] overflow-hidden rounded-lg border border-indigo-300 bg-yellow-300 relative"
          style={{ overflowY: "auto", scrollbarWidth: "none" }}
        >
          {/* Hide scrollbar for webkit browsers */}
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          <ul ref={contentRef} className="space-y-4 px-4">
            {duplicatedNotices.length === 0 ? (
              <li className="text-center text-gray-700 font-semibold">
                No latest notices found.
              </li>
            ) : (
              duplicatedNotices.map((notice, idx) => (
                <li
                  key={`${notice._id}-${idx}`} // unique key due to duplication
                  className="bg-indigo-50 p-3 rounded-md shadow-sm hover:shadow-md transition-shadow"
                >
                  <a
                    href={notice.fileContent}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 font-semibold hover:underline"
                    title="Click to open PDF"
                  >
                    {notice.title}
                  </a>
                  <p className="text-gray-700 mt-1 text-sm">
                    Published on:{" "}
                    {new Date(notice.date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LatestNoticesWithImage;
