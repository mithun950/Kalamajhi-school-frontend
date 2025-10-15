import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [className, setClassName] = useState("");
  const [form, setForm] = useState({ name: "", roll: "", section: "" });

  const fetchStudents = async () => {
    if (!className) return;
    const res = await axios.get(`http://localhost:5000/api/students/class/${className}`);
    setStudents(res.data);
  };

  const handleAdd = async () => {
    await axios.post("http://localhost:5000/api/students", { ...form, className });
    setForm({ name: "", roll: "", section: "" });
    fetchStudents();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/students/${id}`);
    fetchStudents();
  };

  useEffect(() => { fetchStudents(); }, [className]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Students</h1>

      <div className="mb-4 flex gap-2">
        <input
          placeholder="Select Class"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="border p-2"
        />
        <button onClick={fetchStudents} className="bg-blue-500 text-white px-4 py-2 rounded">
          Fetch
        </button>
      </div>

      <div className="mb-4 flex gap-2">
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({...form, name:e.target.value})} className="border p-2"/>
        <input placeholder="Roll" value={form.roll} onChange={(e) => setForm({...form, roll:e.target.value})} className="border p-2"/>
        <input placeholder="Section" value={form.section} onChange={(e) => setForm({...form, section:e.target.value})} className="border p-2"/>
        <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Roll</th>
            <th className="border p-2">Section</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td className="border p-2">{s.name}</td>
              <td className="border p-2">{s.roll}</td>
              <td className="border p-2">{s.section}</td>
              <td className="border p-2">
                <button onClick={() => handleDelete(s._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageStudents;
