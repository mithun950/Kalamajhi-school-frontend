import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const Routines = () => {
  const [className, setClassName] = useState("Class-6");
  const [section, setSection] = useState("A");
  const [routines, setRoutines] = useState([]);
  const [periods, setPeriods] = useState([]);
  const routineRef = useRef();

  // Fetch routines from backend
  const fetchRoutines = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/routines/${className}/${section}`
      );
      setRoutines(res.data);

      // Get unique periods dynamically
      const uniquePeriods = [...new Set(res.data.map((r) => r.period))];
      setPeriods(uniquePeriods);
    } catch (err) {
      console.error(err);
      setRoutines([]);
      setPeriods([]);
    }
  }, [className, section]);

  useEffect(() => {
    fetchRoutines();
  }, [fetchRoutines]);

  // Prepare table data
  const tableData = days.map((day) => ({
    day,
    periods: periods.map((p, index) => {
      const routine = routines.find(
        (r) => r.day === day && r.period === p
      );
      if (routine?.subject.toLowerCase().includes("break"))
        return { subject: "Break", teacher: "", key: `break-${index}` };
      return routine || { subject: "", teacher: "", key: `period-${index}` };
    }),
  }));

  // PDF Download
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`${className} Section ${section} Routine`, 14, 22);

    const head = [["Day / Period", ...periods]];
    const body = tableData.map((row) => [
      row.day,
      ...row.periods.map((p) =>
        p.subject ? `${p.subject}\n${p.teacher}` : ""
      ),
    ]);

    autoTable(doc, {
      startY: 30,
      head: head,
      body: body,
      styles: { cellPadding: 3, fontSize: 10 },
      headStyles: { fillColor: [255, 165, 0] }, // Orange header
    });

    doc.save(`${className}_Section_${section}_Routine.pdf`);
  };

  return (
    <div className="w-11/12 mx-auto p-4 mt-10 mb-10">
      <h1 className="text-3xl font-bold mb-6 text-orange-400">
        📅 Class Routine
      </h1>

      {/* Filter Options */}
      <div className="mb-6 flex flex-wrap gap-3">
        <select
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="select select-bordered font-bold text-xl border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option>Class-6</option>
          <option>Class-7</option>
          <option>Class-8</option>
          <option>Class-9</option>
          <option>Class-10</option>
        </select>

        <select
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="select select-bordered font-bold text-xl border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>

        <button
          className="btn bg-orange-400 hover:bg-orange-500 border-none px-2 py-2 rounded font-semibold text-white"
          onClick={downloadPDF}
        >
          ⬇ Download PDF
        </button>
      </div>

      {/* Routine Table */}
      <div
        ref={routineRef}
        className="overflow-x-auto shadow-lg rounded-lg border border-orange-300"
      >
        <table className="table-auto w-full text-center border-collapse">
          <thead>
            <tr className="bg-orange-400 text-white">
              <th className="border border-orange-300 p-2">Day / Period</th>
              {periods.map((p, index) => (
                <th
                  key={index}
                  className="border border-orange-300 p-2 font-semibold"
                >
                  {p}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.day} className="hover:bg-orange-50">
                <td className="border border-orange-200 p-2 font-bold text-orange-500">
                  {row.day}
                </td>
                {row.periods.map((r) => (
                  <td key={r.key} className="border border-orange-200 p-2">
                    {r.subject ? (
                      <>
                        <div className="font-semibold">{r.subject}</div>
                        <div className="text-sm text-gray-600">
                          {r.teacher}
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Routines;
