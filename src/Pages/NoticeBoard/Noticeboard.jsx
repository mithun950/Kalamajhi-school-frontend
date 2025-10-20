import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const NoticeBoardTable = () => {
  const [notices, setNotices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 15;

  useEffect(() => {
    fetch("https://kalamajhi-high-school-backend.vercel.app/api/notices")
      .then((res) => res.json())
      .then((data) => setNotices(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredNotices = notices.filter((notice) =>
    notice.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredNotices.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  const totalPages = Math.ceil(filteredNotices.length / entriesPerPage);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  // PDF open function
  const handleFileClick = (notice) => {
    if (notice.file) {
      // If there's a file, open it in a new tab
      const fileUrl = `https://kalamajhi-high-school-backend.vercel.app/uploads/${notice.file}`;
      window.open(fileUrl, '_blank');
    } else if (notice.fileContent) {
      // If only fileContent exists, show alert or handle differently
      alert(`Content: ${notice.fileContent}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-10 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="w-full md:w-11/12 max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-10 animate-fadeInDown">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span>School Announcements</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent mb-4">
            📢 নোটিস বোর্ড
          </h2>
          <p className="text-gray-700 text-lg">
            Notice Board - সকল বিজ্ঞপ্তি ও নোটিশ
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-amber-600 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Search Bar */}
        <div className="flex justify-end mb-8 animate-fadeInUp">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search by Title..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-orange-200 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 shadow-lg transition-all duration-300"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500" />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-orange-200 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500">
                  <th className="py-4 px-6 text-center w-16 font-bold text-white tracking-wide">
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                      </svg>
                      Sl
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left font-bold text-white tracking-wide">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      File/Content
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left font-bold text-white tracking-wide">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                      Title
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left font-bold text-white tracking-wide">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Publication Date
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentEntries.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-16 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center mb-4">
                          <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <p className="text-xl font-semibold text-gray-700">No entries found.</p>
                        <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentEntries.map((notice, index) => (
                    <tr
                      key={notice._id}
                      className={`transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 ${
                        index % 2 === 0 ? "bg-white" : "bg-orange-50/30"
                      }`}
                    >
                      <td className="py-4 px-6 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full text-white font-bold text-sm">
                          {indexOfFirstEntry + index + 1}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {notice.file ? (
                          <button
                            onClick={() => handleFileClick(notice)}
                            className="group flex items-center gap-2 text-orange-600 hover:text-amber-600 font-medium transition-all duration-300 max-w-xs"
                          >
                            <svg className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            <span className="truncate group-hover:underline">
                              {notice.fileContent || "View PDF"}
                            </span>
                            <svg className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </button>
                        ) : (
                          <span className="text-gray-500 italic">{notice.fileContent || "N/A"}</span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-gray-800">{notice.title}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-gray-600">
                          <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>
                            {new Date(notice.date).toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center flex-wrap gap-2 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-5 py-2 rounded-full font-bold transition-all duration-300 transform hover:scale-105 ${
                  currentPage === pageNum
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
                    : "bg-white text-orange-600 border-2 border-orange-300 hover:border-orange-500 hover:bg-orange-50"
                }`}
                aria-label={`Go to page ${pageNum}`}
              >
                {pageNum}
              </button>
            ))}
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-xl border-2 border-orange-200 animate-fadeInUp" style={{ animationDelay: '600ms' }}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
                Notice Information
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  স্কুলের সকল গুরুত্বপূর্ণ বিজ্ঞপ্তি এখানে পাওয়া যাবে
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  File/Content এ ক্লিক করে PDF ফাইল দেখুন
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  নিয়মিত নতুন নোটিশ চেক করুন
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default NoticeBoardTable;