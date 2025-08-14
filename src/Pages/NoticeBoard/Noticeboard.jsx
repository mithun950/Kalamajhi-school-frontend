import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const NoticeBoardTable = () => {
  const [notices, setNotices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 15;

  useEffect(() => {
    fetch("http://localhost:5000/api/notices")
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

  return (
    <div className="p-8 w-full md:w-11/12  mx-auto">
      <h2 className="text-4xl font-bold mb-8 text-gray-900">Notice Board</h2>

      {/* Search bar */}
      <div className="flex justify-end mb-8">
        <div className="relative w-72">
          <input
            type="text"
            placeholder="Search by Title..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-300">
        <table className="min-w-full border-collapse">
          <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <tr>
              <th className="py-4 px-6 text-center w-16 font-semibold tracking-wide">
                Sl
              </th>
              <th className="py-4 px-6 text-left font-semibold tracking-wide">
                File/Content
              </th>
              <th className="py-4 px-6 text-left font-semibold tracking-wide">
                Title
              </th>
              <th className="py-4 px-6 text-left font-semibold tracking-wide">
                Publication Date
              </th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="py-10 text-center text-gray-500 italic"
                >
                  No entries found.
                </td>
              </tr>
            ) : (
              currentEntries.map((notice, index) => (
                <tr
                  key={notice._id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="py-3 px-6 text-center text-indigo-700 font-semibold">
                    {indexOfFirstEntry + index + 1}
                  </td>
                  <td className="py-3 px-6 text-gray-600 italic max-w-xs truncate">
                    {notice.fileContent || "N/A"}
                  </td>
                  <td className="py-3 px-6 text-purple-700 font-medium">
                    {notice.title}
                  </td>
                  <td className="py-3 px-6 text-gray-500">
                    {new Date(notice.date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center space-x-3">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={`px-5 py-2 rounded-full font-semibold transition-shadow duration-300
              ${
                currentPage === pageNum
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-100"
              }
            `}
            aria-label={`Go to page ${pageNum}`}
          >
            {pageNum}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NoticeBoardTable;
