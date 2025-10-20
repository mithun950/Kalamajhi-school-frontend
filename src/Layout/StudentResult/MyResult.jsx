import React, { useState } from "react";
import axios from "axios";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfFonts.vfs; 

export default function MyResult() {
  const [className, setClassName] = useState("");
  const [roll, setRoll] = useState("");
  const [student, setStudent] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resultType, setResultType] = useState("half");

  const handleSearch = async () => {
    if (!className || !roll) {
      setError("Class and Roll are required");
      return;
    }

    setLoading(true);
    setError("");
    setStudent(null);
    setResults(null);

    try {
      const res = await axios.get(`https://kalamajhi-high-school-backend.vercel.app/api/students/class/${className}`);
      const s = res.data.find(st => st.roll === Number(roll));

      if (!s) {
        setError("Student not found");
        setLoading(false);
        return;
      }

      setStudent(s);
      const r = await axios.get(`https://kalamajhi-high-school-backend.vercel.app/api/results/${s._id}`);
      if (!r.data) {
        setError("Result not found for this student");
      } else {
        setResults(r.data);
      }
    } catch (err) {
      setError("Something went wrong: " + (err.response?.data?.error || err.message));
    }

    setLoading(false);
  };

  const getTotalMarks = (subjects) => {
    if (!subjects) return 0;
    return Object.values(subjects).reduce((sum, mark) => sum + Number(mark || 0), 0);
  };

  const handleDownload = () => {
    if (!student || !results) {
      alert("Please search a student first!");
      return;
    }

    const exams = [
      { title: "Half Yearly Exam", data: results.half },
      { title: "Yearly Exam", data: results.yearly },
    ];

    const docDefinition = {
      content: [
        { text: "🏫 School Result Sheet", style: "header", alignment: "center" },
        { text: `Name: ${student.name}`, margin: [0, 10, 0, 0] },
        { text: `Class: ${className}`, margin: [0, 0, 0, 0] },
        { text: `Roll: ${student.roll}`, margin: [0, 0, 0, 10] },
      ],
      styles: {
        header: { fontSize: 22, bold: true, decoration: "underline" },
        examTitle: { fontSize: 16, bold: true, color: "#1E3A8A", margin: [0, 5, 0, 5] },
        tableHeader: { bold: true, fillColor: "#eeeeee" },
      },
    };

    exams.forEach(exam => {
      if (!exam.data) return;

      docDefinition.content.push({ text: exam.title, style: "examTitle" });

      const tableBody = [
        [{ text: "Subject", style: "tableHeader" }, { text: "Marks", style: "tableHeader" }],
      ];

      Object.entries(exam.data.subjects).forEach(([sub, mark]) => {
        tableBody.push([sub, mark.toString()]);
      });

      tableBody.push([
        { text: "Total Marks", colSpan: 1, bold: true }, 
        { text: getTotalMarks(exam.data.subjects).toString(), bold: true }
      ]);

      if (exam.data.failSubjects && exam.data.failSubjects.length > 0) {
        tableBody.push([
          { text: "Failed Subjects", colSpan: 1, color: "red", bold: true },
          { text: exam.data.failSubjects.join(", "), color: "red" }
        ]);
      }

      docDefinition.content.push({
        table: { headerRows: 1, widths: ["*", "*"], body: tableBody },
        layout: "lightHorizontalLines",
        margin: [0, 0, 0, 15]
      });
    });

    docDefinition.content.push({
      columns: [
        { text: "__________________________\nTeacher's Signature", width: "*", alignment: "center" },
        { text: "__________________________\nPrincipal's Signature", width: "*", alignment: "center" }
      ]
    });

    pdfMake.createPdf(docDefinition).download(`${student.name}_Result.pdf`);
  };

  const filteredResult = results
    ? resultType === "half"
      ? results.half
      : results.yearly
    : null;

  const totalMarks = filteredResult?.subjects ? getTotalMarks(filteredResult.subjects) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-10 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-10 animate-fadeInDown">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Student Result Portal</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent mb-4">
            📊 ছাত্র-ছাত্রীর ফলাফল
          </h2>
          <p className="text-gray-700 text-lg">
            View Student Result - পরীক্ষার ফলাফল দেখুন
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-amber-600 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border-4 border-orange-200 animate-fadeInUp">
          <div className="space-y-4">
            {/* Class Name Input */}
            <div className="animate-fadeInUp" style={{ animationDelay: '100ms' }}>
              <label className="block mb-2 font-semibold text-gray-700 flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                Class Name
              </label>
              <input
                type="text"
                placeholder="Enter Class (e.g., Class-6)"
                value={className}
                onChange={e => setClassName(e.target.value)}
                className="w-full border-2 border-orange-200 px-4 py-3 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-white shadow-sm hover:shadow-md"
              />
            </div>

            {/* Roll Number Input */}
            <div className="animate-fadeInUp" style={{ animationDelay: '150ms' }}>
              <label className=" mb-2 font-semibold text-gray-700 flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                </div>
                Roll Number
              </label>
              <input
                type="text"
                placeholder="Enter Roll Number"
                value={roll}
                onChange={e => setRoll(e.target.value)}
                className="w-full border-2 border-orange-200 px-4 py-3 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-white shadow-sm hover:shadow-md"
              />
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none animate-fadeInUp"
              style={{ animationDelay: '200ms' }}
            >
              {loading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Search Result</span>
                </>
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 flex items-center gap-2 bg-red-50 border-2 border-red-200 rounded-xl p-4 animate-fadeInUp">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-600 font-semibold">{error}</p>
            </div>
          )}
        </div>

        {/* Result Type Selector */}
        {student && results && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border-2 border-orange-200 animate-fadeInUp">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <label className="font-bold text-gray-700 flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Select Result Type:
              </label>
              <select
                value={resultType}
                onChange={e => setResultType(e.target.value)}
                className="border-2 border-orange-200 px-6 py-2 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 font-semibold text-gray-800 cursor-pointer"
              >
                {results.half && <option value="half">📚 Half Yearly Exam</option>}
                {results.yearly && <option value="yearly">📖 Yearly Exam</option>}
              </select>
            </div>
          </div>
        )}

        {/* Result Display Section */}
        {student && filteredResult && (
          <div id="result-section" className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-orange-200 animate-fadeInUp">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 p-6 text-center">
              <h3 className="font-bold text-2xl text-white mb-2">
                {student.name}'s {resultType === "half" ? "Half Yearly" : "Yearly"} Result
              </h3>
              <div className="flex items-center justify-center gap-6 text-white/90">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Class: {className}
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                  Roll: {student.roll}
                </span>
              </div>
            </div>

            {/* Marks Table */}
            <div className="p-6">
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-4 mb-4">
                <h4 className="font-bold text-lg text-orange-700 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Subject Marks
                </h4>
                <div className="space-y-2">
                  {Object.entries(filteredResult.subjects).map(([sub, mark], index) => (
                    <div
                      key={sub}
                      className="bg-white border-2 border-orange-200 rounded-xl p-4 flex justify-between items-center hover:shadow-md transition-shadow"
                    >
                      <span className="font-semibold text-gray-700 flex items-center gap-2">
                        <span className="w-8 h-8 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {index + 1}
                        </span>
                        {sub}
                      </span>
                      <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                        {mark}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Marks */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-4 mb-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg text-green-700 flex items-center gap-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    Total Marks:
                  </span>
                  <span className="text-3xl font-bold text-green-700">{totalMarks}</span>
                </div>
              </div>

              {/* Failed Subjects */}
              {filteredResult.failSubjects && filteredResult.failSubjects.length > 0 && (
                <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 rounded-2xl p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-bold text-red-700 mb-1">Failed Subjects:</p>
                      <p className="text-red-600 font-semibold">
                        {filteredResult.failSubjects.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Download Button */}
              <div className="text-center mt-6">
                <button
                  onClick={handleDownload}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download PDF Result</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-xl border-2 border-orange-200 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
                How to Check Result
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Enter your class name (e.g., Class-6)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Enter your roll number
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Select exam type (Half Yearly or Yearly)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Download PDF for offline copy
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
}