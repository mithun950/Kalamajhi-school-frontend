import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentList = () => {
  const [className, setClassName] = useState("");
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    if (!className) return;
    const res = await axios.get(`http://localhost:5000/api/students/class/${className}`);
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, [className]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student List</h1>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Enter Class"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="border p-2"
        />
        <button
          onClick={fetchStudents}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Fetch
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Roll</th>
            <th className="border p-2">Class</th>
            <th className="border p-2">Section</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td className="border p-2">{s.name}</td>
              <td className="border p-2">{s.roll}</td>
              <td className="border p-2">{s.className}</td>
              <td className="border p-2">{s.section}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
