import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const ManageRoutine = () => {
  const [className, setClassName] = useState("Class-6");
  const [section, setSection] = useState("A");
  const [routines, setRoutines] = useState([]);
  const [periods, setPeriods] = useState([]);
  const [form, setForm] = useState({
    day: "Sunday",
    period: "",
    subject: "",
    teacher: ""
  });
  const [editId, setEditId] = useState(null);

  const fetchRoutines = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/routines/${className}/${section}`
      );
      setRoutines(res.data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/routines/${editId}`, {
          ...form,
          class: className,
          section
        });
        setEditId(null);
      } else {
        await axios.post("http://localhost:5000/routines", {
          ...form,
          class: className,
          section
        });
      }
      setForm({ day: "Sunday", period: "", subject: "", teacher: "" });
      fetchRoutines();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (routine) => {
    setForm(routine);
    setEditId(routine._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/routines/${id}`);
      fetchRoutines();
    } catch (err) {
      console.error(err);
    }
  };

  const tableData = days.map((day) => ({
    day,
    periods: periods.map((p, index) => {
      const routine = routines.find(
        (r) => r.day === day && r.period === p
      );
      if (routine?.subject.toLowerCase().includes("break"))
        return { subject: "Break", key: `break-${index}` };
      return routine || { subject: "", teacher: "", key: `period-${index}` };
    })
  }));

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-orange-500 text-center">
        Manage Routine
      </h1>

      {/* Class & Section Select */}
      <div className="mb-6 flex flex-col sm:flex-row gap-3 justify-center">
        <select
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="select border-2 border-orange-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 rounded-lg shadow-sm transition-all duration-200"
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
          className="select border-2 border-orange-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 rounded-lg shadow-sm transition-all duration-200"
        >
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-6"
      >
        <select
          value={form.day}
          onChange={(e) => setForm({ ...form, day: e.target.value })}
          className="select border-2 border-orange-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 rounded-lg shadow-sm transition-all duration-200"
        >
          {days.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>

        <input
          type="text"
          value={form.period}
          onChange={(e) => setForm({ ...form, period: e.target.value })}
          placeholder="10:11-11:00"
          className="input border-2 border-orange-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 rounded-lg shadow-sm transition-all duration-200"
        />

        <input
          type="text"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          placeholder="Subject"
          className="input border-2 border-orange-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 rounded-lg shadow-sm transition-all duration-200"
        />

        <input
          type="text"
          value={form.teacher}
          onChange={(e) => setForm({ ...form, teacher: e.target.value })}
          placeholder="Teacher"
          className="input border-2 border-orange-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 rounded-lg shadow-sm transition-all duration-200"
        />

        <button
          type="submit"
          className="btn bg-orange-400 hover:bg-orange-500 border-none text-white flex items-center gap-2 rounded-lg shadow-md transition-all duration-200"
        >
          <FaPlus /> {editId ? "Update Routine" : "Add Routine"}
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto border border-gray-300 w-full text-center text-sm sm:text-base">
          <thead>
            <tr className="bg-orange-100">
              <th className="border p-2">Day / Period</th>
              {periods.map((p, index) => (
                <th key={index} className="border p-2">
                  {p}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.day}>
                <td className="border p-2 font-bold bg-orange-50">{row.day}</td>
                {row.periods.map((r) => (
                  <td key={r.key} className="border p-2">
                    {r.subject !== "Break" ? (
                      <>
                        <div className="font-semibold">{r.subject}</div>
                        <div className="text-xs text-gray-600">{r.teacher}</div>
                        {r._id && (
                          <div className="flex gap-1 justify-center mt-1">
                            <button
                              className="btn btn-xs bg-orange-300 hover:bg-orange-400 text-white border-none"
                              onClick={() => handleEdit(r)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-xs bg-red-400 hover:bg-red-500 text-white border-none"
                              onClick={() => handleDelete(r._id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      "Break"
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

export default ManageRoutine;
