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
      const res = await axios.get(`http://localhost:5000/api/students/class/${className}`);
      const s = res.data.find(st => st.roll === Number(roll));

      if (!s) {
        setError("Student not found");
        setLoading(false);
        return;
      }

      setStudent(s);
      const r = await axios.get(`http://localhost:5000/api/results/${s._id}`);
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
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">View Student Result</h2>

      <div className="space-y-3 mb-4">
        <input
          className="input input-bordered w-full"
          placeholder="Class Name"
          value={className}
          onChange={e => setClassName(e.target.value)}
        />
        <input
          className="input input-bordered w-full"
          placeholder="Roll Number"
          value={roll}
          onChange={e => setRoll(e.target.value)}
        />
        <button
          className="btn bg-green-500 text-white w-full"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      {student && results && (
        <div className="mb-3 text-center">
          <label className="font-semibold mr-2">Select Result Type:</label>
          <select
            value={resultType}
            onChange={e => setResultType(e.target.value)}
            className="input input-bordered"
          >
            {results.half && <option value="half">Half Yearly</option>}
            {results.yearly && <option value="yearly">Yearly</option>}
          </select>
        </div>
      )}

      {student && filteredResult && (
        <div id="result-section" className="border rounded p-4 shadow bg-white">
          <h3 className="font-bold text-lg mb-2 text-center">
            {student.name}'s {resultType === "half" ? "Half Yearly" : "Yearly"} Result
          </h3>
          <p className="text-sm text-gray-600 mb-2 text-center">
            Class: {className} | Roll: {student.roll}
          </p>

          <div className="mt-2">
            {Object.entries(filteredResult.subjects).map(([sub, mark]) => (
              <p key={sub} className="border-b py-1 flex justify-between">
                <span>{sub}</span>
                <span>{mark}</span>
              </p>
            ))}
          </div>

          <p className="mt-3 font-semibold text-right">Total Marks: {totalMarks}</p>
          {filteredResult.failSubjects && filteredResult.failSubjects.length > 0 && (
            <p className="text-right text-red-500">
              Failed Subjects: {filteredResult.failSubjects.join(", ")}
            </p>
          )}

          <div className="text-center mt-4">
            <button
              className="btn bg-blue-500 text-white"
              onClick={handleDownload}
            >
              Download PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
