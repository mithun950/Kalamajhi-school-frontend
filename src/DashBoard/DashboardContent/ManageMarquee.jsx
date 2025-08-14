// AdminMarquee.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageMarquee = () => {
  const [text, setText] = useState("");
  const [notices, setNotices] = useState([]);
  const [editId, setEditId] = useState(null);
  const [activeId, setActiveId] = useState(null);

  const fetchNotices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/marquees");
      setNotices(res.data);
      const active = res.data.find((n) => n.active);
      setActiveId(active?._id || null);
    } catch (err) {
      console.error("Failed to fetch marquees:", err);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/marquees/${editId}`, { text });
        setEditId(null);
      } else {
        await axios.post("http://localhost:5000/api/marquees", { text, date: new Date(), active: false });
      }
      setText("");
      fetchNotices();
    } catch (err) {
      console.error("Failed to save marquee:", err);
    }
  };

  const handleEdit = (notice) => {
    setText(notice.text);
    setEditId(notice._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/marquees/${id}`);
      fetchNotices();
    } catch (err) {
      console.error("Failed to delete marquee:", err);
    }
  };

  const handleSetActive = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/marquees/setActive`, { id });
      fetchNotices();
    } catch (err) {
      console.error("Failed to set active marquee:", err);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Manage Marquee</h2>

      {/* Form */}
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col sm:flex-row gap-2 mb-6"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Marquee Text"
          className="border p-2 flex-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition w-full sm:w-auto"
        >
          {editId ? "Update" : "Post"}
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b">Active</th>
              <th className="px-4 py-2 border-b text-left">Text</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((notice) => (
              <tr key={notice._id} className={notice._id === activeId ? "bg-green-50" : ""}>
                <td className="text-center px-4 py-2 border-b">
                  <input
                    type="radio"
                    checked={notice._id === activeId}
                    onChange={() => handleSetActive(notice._id)}
                  />
                </td>
                <td className="px-4 py-2 border-b">{notice.text}</td>
                <td className="flex gap-2 justify-center px-4 py-2 border-b">
                  <button
                    onClick={() => handleEdit(notice)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(notice._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMarquee;
